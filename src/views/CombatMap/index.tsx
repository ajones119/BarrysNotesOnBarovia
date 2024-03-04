import { mutateCombatCharacter, useCombat, useCombatCharacters, useEditCombatCharacter, useUpdateInitiative } from "@services/CombatService";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import css from "./CombatMap.module.scss"
import {DndContext} from '@dnd-kit/core';
import Token from "./components/Token";
import Map from "./components/Map";
import { Typography } from "@components/Typography/Typography";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import { Spacer } from "@components/Spacer/Spacer";
import { Button } from "@components/Button/Button";
import ExtraTokenContent from "./components/Token/ExtraTokenContent";
import SettingsDrawer from "./components/SettingsDrawer";
import CharacterTokenContent from "./components/Token/CharacterTokenContent";
import useCombatMapStore from "./CombatMapStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { mutateCombatToken, useCombatMap, useCombatMapTokens, useUpdateCombatMap } from "@services/CombatMapService";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FloatingButtonContainer from "@components/FloatingButtonContainer";
import Spinner from "@components/Spinner";

type DroppableToken = {
  id: string,
  data: any,
  disabled?: boolean
}

const CombatMap = ({combatIdOverride = "", isPlayer = false}) => {
    const mapContainer = useFullScreenHandle();
    console.log(combatIdOverride)
    const { combatId = combatIdOverride } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const scale = Number(searchParams.get("scale")) || 1;

    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

    const [tokens, setTokens] = useState<DroppableToken[]>([]);
    const [extraTokens, setExtraTokens] = useState<DroppableToken[]>([]);
    const [selectedToken, setSelectedToken] = useState<DroppableToken| null>();
    const [cachedCoords, setCachedCoords] = useState<{x: number, y: number}| null>()
    const {currentMapCoordinates, setCurrentMapCoordinates} = useCombatMapStore();

    const { combat, isLoading, isRefetching } = useCombat(combatId);
    const { combatMap, isLoading: isMapLoading, isRefetching: isMapRefetching } = useCombatMap(combatId || combatIdOverride);
    const {combatCharacters = [], isLoading: isCharactersLoading} = useCombatCharacters(combatId);
    const {tokens: combatTokens, isLoading: isTokensLoading} = useCombatMapTokens(combatMap?.docId || "")
    const { currentTurnIndex } = combat;

    const mapRef = useRef<HTMLDivElement>(null); 

    const onScroll = (e: Event) => {
      setCurrentMapCoordinates({x: mapRef?.current?.scrollLeft || 0, y: mapRef?.current?.scrollTop || 0})
    }

    const downHandler = (e: KeyboardEvent) => {
      e.preventDefault();

      const {key} = e;
      let rotate = 0;

      if (key === "ArrowRight") {
        rotate = 45;
      } else if (key === "ArrowLeft") {
        rotate = -45;
      }

      if (selectedToken && rotate) {
        let newToken = { ...selectedToken }
        newToken.data.rotation += rotate;

        mutateCombatToken(newToken.id, {data: {...newToken.data}})
      }
    }

    useEffect(() => {
      mapRef?.current?.scrollTo(currentMapCoordinates?.x || 0, currentMapCoordinates?.y || 0)
      mapRef?.current?.addEventListener('scroll', onScroll);
      mapRef?.current?.addEventListener('keydown', downHandler);

      return () => {
        mapRef?.current?.removeEventListener('scroll', onScroll);
        mapRef?.current?.removeEventListener('keydown', downHandler)
      }
    }, [JSON.stringify(selectedToken)])

    // set local data from remote
    useDeepCompareEffectNoCheck(() => {
      if (!isMapLoading && !isMapRefetching && !isLoading && !isRefetching) {
        const tokensFromCombat = combatCharacters?.map((character, index) => ({
          id: character?.docId || "",
          data: {
            ...combatCharacters[index],
            ...character
          }
        }))

        const extraTokensFromCombatTokens = combatTokens?.map((token) => ({
          id: token?.docId || "",
          ...token
        }))
        setExtraTokens(extraTokensFromCombatTokens || [])
        setTokens(tokensFromCombat);
    }
    }, [combatMap, combat, combatCharacters, combatTokens]);

    function handleDragEnd(ev: any) {
      let token = tokens.find((x: DroppableToken) => x.id === ev.active.id);
      if (token) {
        token["data"]["position"] = {
          x: (token?.data?.position?.x + ev.delta.x / scale),
          y: (token?.data?.position?.y + ev.delta.y / scale)
        }
        
        const _tokens = tokens.map((x) => {
          if (x.id === token?.id) return token;
          return x;
        });
        //character tokens
        try {
          const {x, y} = token.data.position;
          mutateCombatCharacter(token.id, {position: {x, y}})
          setTokens(_tokens);
        } catch (e) {
          console.log(e)
        }
      } else {
        let extraToken = extraTokens.find((x: DroppableToken) => x.id === ev.active.id);
        if (extraToken) {
          if (ev.delta.x === 0 && ev.delta.y === 0) {
            extraToken["data"]["rotation"] += 45;
          } else {
            extraToken["data"]["position"] = {
              x: (extraToken?.data?.position?.x + ev.delta.x / scale),
              y:( extraToken?.data?.position?.y + ev.delta.y / scale)
            }
          }
          mutateCombatToken(extraToken.id, {data: {...extraToken.data}})
        }

      }

      setSelectedToken(null);
    }

    const handleDragStart = (ev: any) => {
      let extraToken = extraTokens.find((x: DroppableToken) => x.id === ev.active.id);
      if (extraToken) {
        console.log("SELECTED TOKEN", extraToken)
        setSelectedToken({...extraToken});
        setCachedCoords({x: extraToken?.data?.position.x, y: extraToken?.data?.position.y})
      }
    }

    if (isLoading || isMapLoading || isCharactersLoading || isTokensLoading) {
      return <Spinner />
    }

    //work on this further, may need to implement something else for live movement info since db writes get crazy
    const handleDragMove = (ev: any) => {
      let token = tokens.find((x: DroppableToken) => x.id === ev.active.id);
      const { activatorEvent } = ev;
      if (token) {
        token["data"]["position"] = {
          x: (token?.data?.position?.x + ev.delta.x / scale),
          y: (token?.data?.position?.y + ev.delta.y / scale)
        }
        
        const _tokens = tokens.map((x) => {
          if (x.id === token?.id) return token;
          return x;
        });
        //character tokens
        try {
          const {x, y} = token.data.position;
          mutateCombatCharacter(token.id, {position: {x, y}})
          setTokens(_tokens);
        } catch (e) {
          console.log(e)
        }
      } else {
        console.log(ev)

        let extraToken = extraTokens.find((x: DroppableToken) => x.id === ev.active.id);
        console.log(ev.delta.x)
        console.log("===", {
          x: ((cachedCoords?.x || 0) + ev.delta.x / scale),
              y:( (cachedCoords?.y || 0) + ev.delta.y / scale)
      })

        if (extraToken) {
          if (ev.delta.x === 0 && ev.delta.y === 0) {
            extraToken["data"]["rotation"] += 45;
          } else {
            console.log("SELECTED POS", cachedCoords)
            const position = {
              x: ((cachedCoords?.x || 0) + ev.delta.x / scale),
              y:((cachedCoords?.y || 0) + ev.delta.y / scale)
            }
          }
          //set to position
          mutateCombatToken(extraToken.id, {data: {...extraToken.data, cachedCoords}})
        }

      }
    }

    return (
      <div>
        <div>
          <Spacer height={8} />
        </div>
        <FullScreen handle={mapContainer}>
          <div className={`${css.CombatMapContainer} ${mapContainer.active ? css.fullscreen : null}`} ref={mapRef} id="CombatMap">
            <DndContext
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              //onDragMove={handleDragMove}
            >
              <Map
                mapImage={String(combatMap?.mapImage)}
                cols={combatMap?.columns}
                rows={combatMap?.rows}
                tokenSize={(combatMap?.tokenSize || 32) * (scale || 1)}
                hideGrid={combatMap?.hideGrid}
                mapColor={combatMap?.mapColor}
                gridColor={combatMap?.gridColor}
              >
                {extraTokens.map((token) => (
                  <Token
                    styles={{
                      position: "absolute",
                      left: `${token?.data?.position?.x * scale}px`,
                      top: `${token?.data?.position?.y * scale}px`
                    }}
                    id={token.id}
                    disabled={token?.disabled}
                    content={
                    <ExtraTokenContent
                      image={token.data.image}
                      tokenSize={(combatMap?.tokenSize || 32) * (scale || 1)}
                      height={token.data.length}
                      width={token.data.width}
                      color={token.data?.color || null}
                      opacity={token.data?.opacity || null}
                      rotate={token?.data?.rotation || null}
                    />}
                  />
                ))}
                {tokens.map((token, index) => {
                  const { data } = token;
                  return data?.shouldShow && (
                  <Token
                    styles={{
                      position: "absolute",
                      left: `${data?.position?.x * scale}px`,
                      top: `${data?.position?.y * scale}px`
                    }}
                    id={token.id}
                    content={<CharacterTokenContent isPlayer={isPlayer} character={data} tokenSize={(combatMap?.tokenSize || 32) * (scale || 1)} isCurrentTurn={currentTurnIndex === index && data?.playerDocId} />}
                  />
                )})}
              </Map>
            </DndContext>
          </div>
          <FloatingButtonContainer>
            <div className={css.buttonsContainer}>
              {!mapContainer.active && <Button onClick={() => setIsSettingsDrawerOpen(true)} color="secondary" animatedHover><Typography color="light">Settings</Typography></Button>}
              <Button animatedHover onClick={() => mapContainer.active ? mapContainer.exit() : mapContainer.enter()}><Typography color="light">FullScreen</Typography></Button>
              <div style={{display: "flex", justifyContent: "center", alignItems: "center", columnGap: 4}}>
                <Button onClick={
                    () => setSearchParams(searchParams => {
                      searchParams.set("scale", String((scale - 0.1).toFixed(2)));
                      return searchParams;
                    })
                  }><FontAwesomeIcon icon={faMinus} /></Button>
                  <Typography weight="bold" color="light">Zoom</Typography>
                <Button onClick={
                    () => setSearchParams(searchParams => {
                      searchParams.set("scale", String((scale + 0.1).toFixed(2)));
                      return searchParams;
                    })
                  }><FontAwesomeIcon icon={faPlus} /></Button>
              </div>
              { isPlayer && 
                <div>
                  <Button animatedHover onClick={() => setSearchParams(searchParams => {
                    searchParams.set("tab", "initiative");
                    return searchParams
                  })}><Typography>Health</Typography></Button>
                </div>
              }
            </div>
          </FloatingButtonContainer>
            <SettingsDrawer
              isOpen={isSettingsDrawerOpen}
              onClose={() => setIsSettingsDrawerOpen(false)}
              combatId={combatId}
              isPlayer={isPlayer}
            />
        </FullScreen>
      </div>
    );
};

export default CombatMap;