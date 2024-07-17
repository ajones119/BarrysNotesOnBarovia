import { mutateCombatCharacter, useCombat, useCombatCharacters } from "@services/CombatService";
import React, { WheelEvent, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import css from "./CombatMap.module.scss"
import {DndContext} from '@dnd-kit/core';
import Token from "./components/Token";
import Map from "./components/Map";
import { Typography } from "@components/Typography/Typography";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import { Spacer } from "@components/Spacer/Spacer";
import ExtraTokenContent, { calculateAngleFromOrigin, normalizeAngle } from "./components/Token/ExtraTokenContent";
import CharacterTokenContent from "./components/Token/CharacterTokenContent";
import useCombatMapStore from "./CombatMapStore";
import { useAddCombatToken, useCombatMap, useCombatMapSocketService, useCombatMapTokens, useMutateCombatToken, useUpdateCombatMap } from "@services/CombatMapService";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Spinner from "@components/Spinner";
import { useCampaignCharacters } from "@services/CharacterService";
import UtilButtons from "./components/UtilButtons";
import { Button } from "@components/Button/Button";
import { CombatToken } from "@model/CombatMap";
import MapUtilTray from "./components/MapUtilTray";
import useLocalCharacter from "@hooks/useLocalCharacter";
import { useCustomTokens } from "@services/CustomTokensService";
import INTERNAL_TOKENS, { InternalToken } from "./TokensConfig";
import { COLORS_MAP } from "@components/ColorPicker/ColorPicker";
import useMousePosition from "@hooks/useMousePosition";
import zIndex from "@mui/material/styles/zIndex";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
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
    const drawSize = Number(searchParams.get("drawSize")) || 0;
    const color = String(searchParams.get("color")) || "black";
    const isPinging = searchParams.get("isPinging") === "on" || false;
    const pingColor = searchParams.get("pingColor") || COLORS_MAP.Red;

    const [tokens, setTokens] = useState<DroppableToken[]>([]);
    const [extraTokens, setExtraTokens] = useState<DroppableToken[]>([]);
    const [selectedToken, setSelectedToken] = useState<DroppableToken| null>();
    const {currentMapCoordinates, setCurrentMapCoordinates} = useCombatMapStore();

    const {mutate: mutateCombatToken, isLoading: isMutating} = useMutateCombatToken()
    const { combat, isLoading } = useCombat(combatId);
    const { combatMap, isLoading: isMapLoading } = useCombatMap(combatId || combatIdOverride);
    const {mutate: editMap} = useUpdateCombatMap(combatMap?.docId || "");
    const {combatCharacters = [], isLoading: isCharactersLoading} = useCombatCharacters(combatId);
    const {tokens: combatTokens, isLoading: isTokensLoading} = useCombatMapTokens(combatMap?.docId || "", isMutating);
    const { characters: campaignCharacters = [] } = useCampaignCharacters(combat?.campaignDocId || "");
    const {tokens: remoteTokens = [], isLoading: isCustomTokensLoading} = useCustomTokens();
    const {selectedCharacter} = useLocalCharacter(CampaignId)
    const {mutate: addCombatToken} = useAddCombatToken(combatMap?.docId || "")

    const {x: mouseX, y: mouseY} = useMousePosition();
    const [cursors, setCursors] = useState<{x: number, y: number, color: string, id: string}[]>([])

    const character = campaignCharacters.find(character => selectedCharacter === character.docId)

    const favTokens = useMemo(() => {
        let categories = [ ...INTERNAL_TOKENS ];
        if (remoteTokens) {
          console.log(remoteTokens)
            const customCategory = {
                name: "Custom",
                id: "custom",
                tokens: remoteTokens?.map(token => ({
                    ...token,
                    color: token?.canChangeColor ? COLORS_MAP.Black : undefined,
                    baseTokenId: token?.docId
                }))
            }
            // @ts-ignore
            categories.push(customCategory);
        }

        if (character) {
            let favTokenIds = character?.favoriteTokens || [];
            const remappedInternalTokens: InternalToken[] = [];
            categories.forEach(category => {
                remappedInternalTokens.push(...category.tokens)
            });


            const favTokens: InternalToken[] = [];
            favTokenIds.forEach(id => {
                const token = remappedInternalTokens.find(token => id === token?.baseTokenId || id === token?.name)
                token && favTokens.push(token)
            })

            return favTokens;
        }
        return [];
        }, [selectedCharacter, isCharactersLoading, isTokensLoading, JSON.stringify(character?.favoriteTokens)])

    const { currentTurnIndex } = combat;

    const mapRef = useRef<HTMLDivElement>(null); 
    const scaleRef = useRef<number>(scale); 
    const ctrlHeld = useRef(false);
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
        newToken.data.rotation = newToken.data.rotation - (newToken.data.rotation % 45);

        mutateCombatToken({id: newToken.id, token: {data: {...newToken.data}}})
      }
    }

    const handleWheel = (event: any) => {
      if (ctrlHeld.current) {
        event.preventDefault();
        //look into type error here
        mapRef?.current?.scrollBy({x: -event?.deltaX, y: -event?.deltaY} as any)
        if (event.deltaY < 0) {
          setSearchParams(searchParams => {
            searchParams.set("scale", String((scaleRef.current + 0.05).toFixed(2)));
            return searchParams;
          })
        } else if (event.deltaY > 0) {
          setSearchParams(searchParams => {
            searchParams.set("scale", String((scaleRef.current - 0.05).toFixed(2)));
            return searchParams;
          })
        }
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {      
      if (event.ctrlKey) {
        if (event.repeat) return;
        ctrlHeld.current = true;
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

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Control") {
        ctrlHeld.current = false;
      }
    };

    useEffect(() => {
      if (mapRef.current) {
        mapRef?.current?.scrollBy(currentMapCoordinates?.x || 475*scale, currentMapCoordinates?.y || 475 * scale)
        setCurrentMapCoordinates({x: mapRef?.current?.scrollLeft || 475*scale, y: mapRef?.current?.scrollTop || 475 * scale})

      }
    }, [mapRef.current])

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      window.addEventListener('wheel', handleWheel, { passive: false });
      scaleRef.current = scale;
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        window.removeEventListener('wheel', handleWheel);
      };
    }, [scale, drawing, eraserOn, drawSize, color, mapContainer.active])

    useEffect(() => {
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
    }, [combatMap, combat, combatCharacters, combatTokens, campaignCharacters,  ]);

    //cleanup this!!
    function handleDragEnd(ev: any) {
      const tokenIdParts = ev.active.id.split("-")

      if (tokenIdParts[0] === "add") {
        const x = (mouseX  + currentMapCoordinates.x)/scale - (mapRef.current?.getBoundingClientRect().x || 0) ;
        const y = (mouseY + currentMapCoordinates.y)/scale - (mapRef.current?.getBoundingClientRect().y || 0);
        const data = {...ev.active.data.current, position: {x, y}, isPlayer, playerAdded: isPlayer};
        if (!data?.color) {
          delete data.color;
        }
        console.log("DATA", data)
        addCombatToken({data});
        return;
      }

      let token = tokens.find((x: DroppableToken) => x.id === tokenIdParts[0]);
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
        let extraToken = extraTokens.find((x: DroppableToken) => x.id === tokenIdParts[0]);
        if (extraToken) {
          if(extraToken && tokenIdParts[1] === "resize") {
            //double check default here
            const xMultiplier = ev.delta.x < 0 ? -1 : 1;
            const yMultiplier = ev.delta.y < 0 ? -1 : 1;
            const normalizedRotation = normalizeAngle(extraToken?.data?.rotation || 0);
            const radians = normalizedRotation * (Math.PI/180);
            const flip = normalizedRotation < 180 ? 1 : -1;

            let totalDistance = Math.sqrt((ev.delta.x * ev.delta.x) + (ev.delta.y * ev.delta.y));
            let deltaWidthScale = 0;
            let deltaLengthScale = 0;

            if (tokenIdParts[2] === "x") {
              deltaWidthScale = (totalDistance*Math.cos(radians)/scale)/(combatMap?.tokenSize || 30);
              deltaLengthScale = (totalDistance*Math.sin(radians)/scale)/(combatMap?.tokenSize || 30);
            } else {
              deltaWidthScale = (totalDistance*Math.sin(radians)/scale)/(combatMap?.tokenSize || 30);
              deltaLengthScale = (totalDistance*Math.cos(radians)/scale)/(combatMap?.tokenSize || 30);
            }

            extraToken["data"]["width"] = extraToken?.data?.width + (deltaWidthScale * xMultiplier * flip);
            extraToken["data"]["length"] = extraToken?.data?.length + (deltaLengthScale * yMultiplier * flip);

            mutateCombatToken({id: extraToken.id, token: {data: {...extraToken.data}}})

          } else if (tokenIdParts[1] === "rotate") {
            extraToken["data"]["rotation"] = calculateAngleFromOrigin(ev.delta.x, ev.delta.y) + extraToken?.data?.rotation;
          } else {
            extraToken["data"]["position"] = {
              x: (extraToken?.data?.position?.x + ev.delta.x / scale),
              y:( extraToken?.data?.position?.y + ev.delta.y / scale)
            }
          }
          mutateCombatToken({id: extraToken.id, token: {data: {...extraToken.data}}})
        }
      }

      //setSelectedToken(null);
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

    const handleSocketTokenUpdate = (tokenId: string, tokenData: CombatToken) => {
      setTokens(tokens.map(token => {
        if (token.id === tokenId) {
          token.data = tokenData;
          return token;
        } else {
          return token;
        }
      }))
      setExtraTokens(extraTokens.map(token => {
        if (token.id === tokenId) {
          token.data = tokenData;
          return token;
        } else {
          return token
        }
      }))
    }

    useEffect(() => {
      if (isPinging) {
        const x = (mouseX + currentMapCoordinates.x)/scale - (mapRef.current?.getBoundingClientRect().x || 0);
        const y = (mouseY + currentMapCoordinates.y)/scale - (mapRef.current?.getBoundingClientRect().y || 0);
        updatePingingCursor({color: pingColor, x, y})
      }
    }, [mouseX, mouseY, isPinging, currentMapCoordinates.x, currentMapCoordinates.y])

    const handleSocketCursorUpdate = (newCursor: {color: string, x: number, y: number, id: string}) => {
      const newCursors = [...cursors];
      newCursor.x *= scale;
      newCursor.y *= scale;
      const index = newCursors.findIndex(cursor => cursor.id === newCursor.id);

      if (newCursors.length < 1 || index === null || index < 0) {
        newCursors.push(newCursor)
      } else {
        newCursors[index] = newCursor;
      }
      setCursors([...newCursors])
    }

    const {updatePingingCursor, updateTokenPosition, isConnected, reconnect} = useCombatMapSocketService(
      CampaignId,
      handleSocketTokenUpdate,
      handleSocketCursorUpdate,
      { tokens: tokens.concat(extraTokens), mousePosition: {x: mouseX, y: mouseY} }
    );

    const handleDragMove = (event: any) => {   
      if (selectedToken) {
        
        const newTokenData = {...selectedToken["data"]};
        const tokenIdParts = event.active.id.split("-")
        if (tokenIdParts[1] === "resize") {
          const xMultiplier = event.delta.x < 0 ? -1 : 1;
            const yMultiplier = event.delta.y < 0 ? -1 : 1;
            const normalizedRotation = normalizeAngle(newTokenData?.rotation);
            const radians = normalizedRotation * (Math.PI/180);
            const flip = normalizedRotation < 180 ? 1 : -1;

            let totalDistance = Math.sqrt((event.delta.x * event.delta.x) + (event.delta.y * event.delta.y));
            let deltaWidthScale = 0;
            let deltaLengthScale = 0;

            if (tokenIdParts[2] === "x") {
              deltaWidthScale = (totalDistance*Math.cos(radians)/scale)/(combatMap?.tokenSize || 30);
              deltaLengthScale = (totalDistance*Math.sin(radians)/scale)/(combatMap?.tokenSize || 30);
            } else {
              deltaWidthScale = (totalDistance*Math.sin(radians)/scale)/(combatMap?.tokenSize || 30);
              deltaLengthScale = (totalDistance*Math.cos(radians)/scale)/(combatMap?.tokenSize || 30);
            }

            newTokenData["width"] = newTokenData?.width + (deltaWidthScale * xMultiplier * flip);
            newTokenData["length"] = newTokenData?.length + (deltaLengthScale * yMultiplier * flip);

        } else if (tokenIdParts[1] === "rotate") {
          newTokenData["rotation"] = calculateAngleFromOrigin(event.delta.x, event.delta.y) + newTokenData?.rotation;
        } else {
          
          newTokenData["position"] = {
            x: (selectedToken?.data?.position?.x + event.delta.x/scale),
            y:( selectedToken?.data?.position?.y + event.delta.y/scale)
          }
        }
        
        updateTokenPosition(tokenIdParts[0], newTokenData)
      }
    }

    if (isLoading || isMapLoading || isCharactersLoading || isTokensLoading) {
      return <Spinner />
    }

    return (
      <div className={`${css.pageContainer} ${isPinging && css.isPinging}`} onClick={()=> setSelectedToken(null)}>
        {
          !isConnected && <Button color="error" onClick={reconnect}><Typography>Reconnect</Typography></Button>
        }
        <Spacer height={8} />
          <div className={`${css.CombatMapContainer}`} ref={mapRef} id="CombatMap">
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
                      isSelected={token.id === selectedToken?.id}
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
              <MapUtilTray favTokens={favTokens} />
              {
                cursors.map(cursor => 
                  <div 
                    style={{
                      position: "absolute",
                      left: cursor.x,
                      top: cursor.y,
                      color: cursor.color,
                      zIndex: 100,
                    }}
                  >
                    <FontAwesomeIcon icon={faCircleDot} />
                  </div>
                )
              }
            </DndContext>
          </div>
          
          <UtilButtons
            isPlayer={isPlayer}
            combatId={combatId}
          />
      </div>
    );
};

export default CombatMap;