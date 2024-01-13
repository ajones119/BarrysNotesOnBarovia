import { useCombat, useUpdateInitiative } from "@services/CombatService";
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
import { useCombatMap, useUpdateCombatMap } from "@services/CombatMapService";

type DroppableToken = {
  id: string,
  data: any,
  disabled?: boolean
}

const CombatMap = ({combatIdOverride = "", isPlayer = false}) => {
    const { combatId } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const scale = Number(searchParams.get("scale")) || 1;

    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

    const [tokens, setTokens] = useState<DroppableToken[]>([]);
    const [extraTokens, setExtraTokens] = useState<DroppableToken[]>([]);
    const [selectedToken, setSelectedToken] = useState<DroppableToken| null>()
    const {currentMapCoordinates, setCurrentMapCoordinates} = useCombatMapStore();

    const { combat, isLoading, isRefetching } = useCombat(combatId || combatIdOverride);
    const { combatMap, isLoading: isMapLoading, isRefetching: isMapRefetching } = useCombatMap(combatId || combatIdOverride);
    console.log("MAP", combatMap, isMapLoading)

    const { combatCharacterArray = [], currentTurnIndex } = combat;
    const { map, combatMapCharacterArray } = combatMap || {map: {extraTokens: []}, combatMapCharacterArray: []  };
    const update = useUpdateCombatMap(combatMap);

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

        const newTokens = extraTokens?.map(token => {
          if (token?.id === newToken?.id) {
            return newToken
          } else {
            return token
          }
        })

        update({...combatMap, map: {...map, extraTokens: newTokens}});
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
        const tokensFromCombat = combatMapCharacterArray?.map((character, index) => ({
          id: `${index}-${character.turnIndex}`,
          data: {
            ...combatCharacterArray[index],
            ...character
          }
        }))
        setExtraTokens(map?.extraTokens || [])
        setTokens(tokensFromCombat);
    }
    }, [combatMap, combat]);

    function handleDragEnd(ev: any) {
      let token = tokens.find((x: DroppableToken) => x.id === ev.active.id);
      let extraToken = extraTokens.find((x: DroppableToken) => x.id === ev.active.id);
      if (token) {
        token["data"]["position"] = {
          x: (token?.data?.position?.x + ev.delta.x / scale),
          y: (token?.data?.position?.y + ev.delta.y / scale)
        }
        
        const _tokens = tokens.map((x) => {
          if (x.id === token?.id) return token;
          return x;
        });

        const newCombatMap = {...combatMap}
        const updatedCharacterIndex = newCombatMap?.combatMapCharacterArray?.findIndex((character, index) => `${index}-${character.turnIndex}` === token?.id)
        newCombatMap.combatMapCharacterArray[updatedCharacterIndex] = { ...newCombatMap?.combatMapCharacterArray[updatedCharacterIndex], position: { x: token.data.position.x, y: token.data.position.y } }
        update({...newCombatMap})
        
        setTokens(_tokens);
      } else if (extraToken) {
        if (ev.delta.x === 0 && ev.delta.y === 0) {
          extraToken["data"]["rotation"] += 45;
        } else {
          extraToken["data"]["position"] = {
            x: (extraToken?.data?.position?.x + ev.delta.x / scale),
            y:( extraToken?.data?.position?.y + ev.delta.y / scale)
          }
        }

        const updatedTokenIndex = map?.extraTokens?.findIndex((token) => token.id === extraToken?.id) || 0;
        const { extraTokens = [] } = map || {extraTokens: []};
        extraTokens[updatedTokenIndex] = {...extraToken}
        update({...combatMap, map: {...map, extraTokens}})

        setExtraTokens(extraTokens);
      }

      setSelectedToken(null);
    }

    const handleDragStart = (ev: any) => {
      let extraToken = extraTokens.find((x: DroppableToken) => x.id === ev.active.id);
      if (extraToken) {
        setSelectedToken(extraToken);
      }
    }

    return (
      <div>
        <div>
          <Typography>{combat?.name}</Typography>
          <Button onClick={() => setIsSettingsDrawerOpen(true)}>SETTINGS</Button>
          <div style={{display: "flex", justifyContent: "center", alignItems: "center", columnGap: 4}}>
            <Button onClick={() => setSearchParams({scale: String((scale - 0.1).toFixed(2))})}><FontAwesomeIcon icon={faMinus} /></Button>
              <Typography>Zoom</Typography>
            <Button onClick={() => setSearchParams({scale: String((scale + 0.1).toFixed(2))})}><FontAwesomeIcon icon={faPlus} /></Button>
          </div>
          <Spacer height={24} />
          <SettingsDrawer
            isOpen={isSettingsDrawerOpen}
            onClose={() => setIsSettingsDrawerOpen(false)}
            map={map || {extraTokens: []}}
            setMap={(newMap) => {
              update({...combatMap, map: {...newMap}});
            }}
            isPlayer={isPlayer}
          />
        </div>
        <div className={css.CombatMapContainer} ref={mapRef} id="CombatMap">
          <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <Map
              mapImage={map?.mapImage}
              cols={map?.columns}
              rows={map?.rows}
              tokenSize={(map?.tokenSize || 32) * (scale || 1)}
              hideGrid={map?.hideGrid}
              mapColor={map?.mapColor}
              gridColor={map?.gridColor}
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
                    tokenSize={(map?.tokenSize || 32) * (scale || 1)}
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
                  content={<CharacterTokenContent isPlayer={isPlayer} character={data} tokenSize={(map?.tokenSize || 32) * (scale || 1)} isCurrentTurn={currentTurnIndex === index && data?.playerDocId} />}
                />
              )})}
            </Map>
          </DndContext>
        </div>
      </div>
    );
};

export default CombatMap;