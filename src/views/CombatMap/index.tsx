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
import { Button } from "@components/Button/Button";
import ExtraTokenContent from "./components/Token/ExtraTokenContent";
import SettingsDrawer from "./components/SettingsDrawer";
import CharacterTokenContent from "./components/Token/CharacterTokenContent";
import useCombatMapStore from "./CombatMapStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCombatMap, useCombatMapSocketService, useCombatMapTokens, useMutateCombatToken, useUpdateCombatMap } from "@services/CombatMapService";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import FloatingButtonContainer from "@components/FloatingButtonContainer";
import Spinner from "@components/Spinner";
import TokensDrawer from "./components/TokensDrawer";
import { useSpring, animated } from '@react-spring/web';
import ColorPicker from "@components/ColorPicker/ColorPicker";
import { useCampaignCharacters } from "@services/CharacterService";
import { TextInput } from "@components/TextInput/TextInput";
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
    const color = String(searchParams.get("color")) || "black";
    const drawSize = Number(searchParams.get("drawSize")) || 0;
    const eraserOn = searchParams.get("eraserOn") === "on" || false;

    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
    const [isTokenDrawerOpen, setIsTokenDrawerOpen] = useState(false);

    const [tokens, setTokens] = useState<DroppableToken[]>([]);
    const [extraTokens, setExtraTokens] = useState<DroppableToken[]>([]);
    const [selectedToken, setSelectedToken] = useState<DroppableToken| null>();
    const {currentMapCoordinates, setCurrentMapCoordinates} = useCombatMapStore();
    const [altHeld, setAltHeld] = useState(false);

    const {mutate: mutateCombatToken, isLoading: isMutating} = useMutateCombatToken()
    const { combat, isLoading, isRefetching } = useCombat(combatId);
    const { combatMap, isLoading: isMapLoading, isRefetching: isMapRefetching } = useCombatMap(combatId || combatIdOverride);
    const {mutate: editMap} = useUpdateCombatMap(combatMap?.docId || "");
    const {combatCharacters = [], isLoading: isCharactersLoading} = useCombatCharacters(combatId);
    const {tokens: combatTokens, isLoading: isTokensLoading} = useCombatMapTokens(combatMap?.docId || "", isMutating);
    const { characters: campaignCharacters = [] } = useCampaignCharacters(combat?.campaignDocId || "");
    const [isHovered, setHovered] = useState(false);
    const [hasMovement, setHasMovement] = useState(false);

    const springs = useSpring({
        translateY: isHovered ? -40 : 0,
        opacity: isHovered ? 1 : 0
    })
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
      if (!isMapLoading && !isMapRefetching && !isLoading && !isRefetching && !isMutating) {
        console.log("Update from DB")
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
      console.log("HANDLE DRAG END")
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
      console.log("HANDLE DRAG START")
      let extraToken = extraTokens.find((x: DroppableToken) => x.id === ev.active.id);
      let characterToken = tokens.find((x: DroppableToken) => x.id === ev.active.id);

      if (extraToken) {
        setSelectedToken({...extraToken});
      } else if (characterToken) {
        setSelectedToken(characterToken);
      }
    }

    const handleSocketTokenUpdate = (tokenId: string, x: number, y: number) => {
      console.log("UPDATE FROM SOCKET", tokens.length, extraTokens.length)
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

    const {updateTokenPosition, socket} = useCombatMapSocketService(CampaignId, handleSocketTokenUpdate, {tokens, extraTokens});

    useEffect(() => {
      if (socket) {
          socket?.on("recieve_combat_token_position", (data) => {
              console.log("HANDLE GET")
              socket.id !== data?.senderId && handleSocketTokenUpdate(data?.tokenId, data?.x, data?.y)
          })
      }
  }, [socket]);

    const handleDragMove = (event: any) => {      
      console.log("HANDLE DRAG MOVE")
      const x = (selectedToken?.data?.position.x + event?.delta?.x/scale);
      const y = (selectedToken?.data?.position.y + event?.delta?.y/scale);

      updateTokenPosition(event.active.id, x, y)
    }



    if (isLoading || isMapLoading || isCharactersLoading || isTokensLoading) {
      return <Spinner />
    }

    const getDrawingTitle = () => {
      let title = "Drawing Off";
      if (drawing === "drawing") {
        title = "Drawing";
      }
      if (drawing === "fogOfWar") {
        title = "Fog Of War"
      }

      return title;
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
          <FloatingButtonContainer>
            <div className={css.buttonsContainer}>
              {!mapContainer.active && !isPlayer && <Button onClick={() => setIsSettingsDrawerOpen(true)} color="secondary" animatedHover><Typography color="light">Settings</Typography></Button>}
              {!mapContainer.active && <Button onClick={() => setIsTokenDrawerOpen(true)} color="secondary" animatedHover><Typography color="light">Tokens</Typography></Button>}
              { !isPlayer && 
                <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                    <div style={{position: "relative", marginBottom: -50, zIndex: 2, display: "flex"}}>
                      <Button onClick={() => setSearchParams(searchParams => {
                          const nextState = drawing === "drawing" ? "fogOfWar" : drawing === "fogOfWar" ? "" : "drawing";

                          searchParams.set("drawing", nextState);
                          return searchParams;
                        })
                      } color={drawing ? "tertiary" : "secondary"} animatedHover><Typography color="light">{getDrawingTitle()}</Typography></Button>
                      <Button onClick={() => setSearchParams(searchParams => {

                          searchParams.set("eraserOn", eraserOn ? "off" : "on");
                          return searchParams;
                        })
                      } color={eraserOn ? "success" : "error"} animatedHover><Typography color="light">{<FontAwesomeIcon icon={faEraser} />}</Typography></Button>
                    </div>
                    <animated.div style={springs}>
                      <div className={css.hoveredDrawButtons}>
                        <ColorPicker width={50} value={color} onChange={(value) => {
                          setSearchParams(searchParams => {
                            searchParams.set("color", String(value));
                            return searchParams;
                          })
                        }}/>
                        <TextInput className={css.drawSizeInput} number placeholder="Size" value={drawSize} onChange={(value) => setSearchParams(searchParams => {
                            searchParams.set("drawSize", String(value));
                            return searchParams;
                          })
                        } />
                      </div>
                    </animated.div>
                </div>
              }


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
            />
            <TokensDrawer
              isOpen={isTokenDrawerOpen}
              onClose={() => setIsTokenDrawerOpen(false)}
              combatId={combatId}
              isPlayer={isPlayer}
            />
        </FullScreen>
      </div>
    );
};

export default CombatMap;