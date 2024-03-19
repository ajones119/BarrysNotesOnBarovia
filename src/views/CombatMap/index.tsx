import { mutateCombatCharacter, useCombat, useCombatCharacters } from "@services/CombatService";
import React, { WheelEvent, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import css from "./CombatMap.module.scss"
import {DndContext} from '@dnd-kit/core';
import Token from "./components/Token";
import Map from "./components/Map";
import { Typography } from "@components/Typography/Typography";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import { Spacer } from "@components/Spacer/Spacer";
import ExtraTokenContent from "./components/Token/ExtraTokenContent";
import CharacterTokenContent from "./components/Token/CharacterTokenContent";
import useCombatMapStore from "./CombatMapStore";
import { useCombatMap, useCombatMapSocketService, useCombatMapTokens, useMutateCombatToken, useUpdateCombatMap } from "@services/CombatMapService";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Spinner from "@components/Spinner";
import { useCampaignCharacters } from "@services/CharacterService";
import UtilButtons from "./components/UtilButtons";
type DroppableToken = {
  id: string,
  data: any,
  disabled?: boolean
}

const CombatMap = ({combatIdOverride = "", isPlayer = false}) => {
    const mapContainer = useFullScreenHandle();
    const { combatId = combatIdOverride, CampaignId = "" } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const scale = Number(searchParams.get("scale")) || 1;
    const drawing = String(searchParams.get("drawing")) || "";
    const eraserOn = searchParams.get("eraserOn") === "on" || false;

    const [tokens, setTokens] = useState<DroppableToken[]>([]);
    const [extraTokens, setExtraTokens] = useState<DroppableToken[]>([]);
    const [selectedToken, setSelectedToken] = useState<DroppableToken| null>();
    const {currentMapCoordinates, setCurrentMapCoordinates} = useCombatMapStore();
    const [altHeld, setAltHeld] = useState(false);

    const {mutate: mutateCombatToken, isLoading: isMutating} = useMutateCombatToken()
    const { combat, isLoading } = useCombat(combatId);
    const { combatMap, isLoading: isMapLoading } = useCombatMap(combatId || combatIdOverride);
    const {mutate: editMap} = useUpdateCombatMap(combatMap?.docId || "");
    const {combatCharacters = [], isLoading: isCharactersLoading} = useCombatCharacters(combatId);
    const {tokens: combatTokens, isLoading: isTokensLoading} = useCombatMapTokens(combatMap?.docId || "", isMutating);
    const { characters: campaignCharacters = [] } = useCampaignCharacters(combat?.campaignDocId || "");

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

        mutateCombatToken({id: newToken.id, token: {data: {...newToken.data}}})
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {      
      if (event.altKey) {
        if (event.repeat) return;
        setAltHeld(true);
      }

      if (event.key === "ArrowUp" && altHeld) {
        setSearchParams(searchParams => {
          searchParams.set("scale", String((scale + 0.05).toFixed(2)));
          return searchParams;
        })
      }

      if (event.key === "ArrowDown" && altHeld) {
        setSearchParams(searchParams => {
          searchParams.set("scale", String((scale - 0.05).toFixed(2)));
          return searchParams;
        })
      }

      if (event.key === "l") {
        if (event.repeat) return;

        if (mapContainer.active){
          mapContainer.exit();
        } else {
          mapContainer.enter();
        }
      }

      if (!isPlayer) {
        if (event.key === "d") {
          setSearchParams(searchParams => {
            searchParams.set("drawing", drawing === "drawing" ? "": "drawing");
            return searchParams;
          })
        }

        if (event.key === "f") {
          setSearchParams(searchParams => {
            searchParams.set("drawing", drawing === "fogOfWar" ? "": "fogOfWar");
            return searchParams;
          })
        }

        if (event.key === "e") {
          setSearchParams(searchParams => {
            searchParams.set("eraserOn", eraserOn ? "off": "on");
            return searchParams;
          })
        }
      }
    };

    const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
      if (altHeld) {
        //look into type error here
        mapRef?.current?.scrollBy({x: -event?.deltaX, y: -event?.deltaY} as any)
        if (event.deltaY < 0) {
          setSearchParams(searchParams => {
            searchParams.set("scale", String((scale + 0.05).toFixed(2)));
            return searchParams;
          })
        } else if (event.deltaY > 0) {
          setSearchParams(searchParams => {
            searchParams.set("scale", String((scale - 0.05).toFixed(2)));
            return searchParams;
          })
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.altKey) {
        setAltHeld(false);
      }
    };

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, [scale, drawing, eraserOn, mapContainer.active])

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
      if (!isMapLoading && !isLoading && !isMutating) {
        const tokensFromCombat = combatCharacters?.map((character, index) => {
          const isPC = character?.playerDocId;
          //clean up types here
          let overrides: any = character;

          if (isPC) {
            overrides = campaignCharacters.find(c => c.docId === character?.playerDocId) || character;
          }

          return {
            id: character?.docId || "",
            data: {
              ...combatCharacters[index],
              ...overrides,
              imageURL: overrides?.characterImageURL || overrides?.imageURL
            }
        }})

        const extraTokensFromCombatTokens = combatTokens?.map((token) => ({
          id: token?.docId || "",
          ...token
        }))
        setExtraTokens(extraTokensFromCombatTokens || [])
        setTokens(tokensFromCombat);
    }
    }, [combatMap, combat, combatCharacters, combatTokens, campaignCharacters, selectedToken  ]);

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
          mutateCombatToken({id: extraToken.id, token: {data: {...extraToken.data}}})
        }
      }

      setSelectedToken(null);
    }

    const handleDragStart = (ev: any) => {
      let extraToken = extraTokens.find((x: DroppableToken) => x.id === ev.active.id);
      let characterToken = tokens.find((x: DroppableToken) => x.id === ev.active.id);

      if (extraToken) {
        setSelectedToken({...extraToken});
      } else if (characterToken) {
        setSelectedToken(characterToken);
      }
    }

    const handleSocketTokenUpdate = (tokenId: string, x: number, y: number) => {
      setTokens(tokens.map(token => {
        if (token.id === tokenId) {
          token.data.position = {x, y}
          return token;
        } else {
          return token
        }
      }))

      setExtraTokens(extraTokens.map(token => {
        if (token.id === tokenId) {
          token.data.position = {x, y}
          return token;
        } else {
          return token
        }
      }))
    }

    const {updateTokenPosition} = useCombatMapSocketService(
      CampaignId,
      handleSocketTokenUpdate,
      { tokens: tokens.concat(extraTokens) }
    );

    const handleDragMove = (event: any) => {      
      const x = (selectedToken?.data?.position.x + event?.delta?.x/scale);
      const y = (selectedToken?.data?.position.y + event?.delta?.y/scale);

      updateTokenPosition(event.active.id, x, y)
    }

    if (isLoading || isMapLoading || isCharactersLoading || isTokensLoading) {
      return <Spinner />
    }

    return (
      <div>
        <Typography color="light" size="large">{combat?.name}</Typography>
        <Spacer height={8} />
        <FullScreen handle={mapContainer}>
          <div className={`${css.CombatMapContainer} ${mapContainer.active ? css.fullscreen : null}`} ref={mapRef} id="CombatMap" onWheel={handleWheel}>
            <DndContext
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragMove={handleDragMove}
            >
              <Map
                map={combatMap}
                scale={scale}
                onFogOfWarSaveDraw={(data) => editMap({fogOfWar: data})}
                onSaveDraw={(data) => editMap({lines: data})}
                lines={combatMap?.lines}
                fogOfWar={combatMap?.fogOfWar}
                isPlayer={isPlayer}
              >
                {extraTokens.map((token) => (
                  
                    <ExtraTokenContent
                      token={token}
                      scale={scale}
                      baseTokenSize={(combatMap.tokenSize || 30) * (scale || 1)}
                      isPlayer={isPlayer}
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
                    content={
                      <CharacterTokenContent
                        isPlayer={isPlayer}
                        character={data}
                        tokenSize={(combatMap?.tokenSize || 32) * (scale || 1)}
                        isCurrentTurn={currentTurnIndex === index && data?.playerDocId}
                      />}
                  />
                )})}
              </Map>
            </DndContext>
          </div>
          
          <UtilButtons
            isPlayer={isPlayer}
            combatId={combatId}
            mapContainer={mapContainer}
          />
        </FullScreen>
      </div>
    );
};

export default CombatMap;