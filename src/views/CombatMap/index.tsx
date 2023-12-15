import { useCombat, useUpdateInitiative } from "@services/CombatService";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
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
import { useEffectOnce, useLockedBody } from "usehooks-ts";

type DroppableToken = {
  id: string,
  data: any,
  disabled?: boolean
}

const CombatMap = ({combatIdOverride = "", isPlayer = false}) => {
    const { combatId } = useParams();

    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

    const [tokens, setTokens] = useState<DroppableToken[]>([]);
    const [extraTokens, setExtraTokens] = useState<DroppableToken[]>([]);
    const [selectedToken, setSelectedToken] = useState<DroppableToken| null>()
    const canRotate = useRef(false)
    const {currentMapCoordinates, setCurrentMapCoordinates} = useCombatMapStore();

    const { combat, isLoading, isRefetching } = useCombat(combatId || combatIdOverride);
    const { combatCharacterArray = [], map = {extraTokens: []}, currentTurnIndex } = combat;
    const update = useUpdateInitiative(combat);

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

      console.log(key)
      if (selectedToken && rotate) {
        console.log("ROTATE")
        let newToken = { ...selectedToken }
        newToken.data.rotation += rotate;

        const newTokens = extraTokens?.map(token => {
          if (token?.id === newToken?.id) {
            return newToken
          } else {
            return token
          }
        })

        update({...combat, map: {...map, extraTokens: newTokens}});
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


    useDeepCompareEffectNoCheck(() => {
      if (!isLoading && !isRefetching) {
        const tokensFromCombat = combatCharacterArray?.map((character, index) => ({
          id: `${index}-${character.name}`,
          data: {
            position: {
              x: 200,
              y: 200,
            },
            ...character
          }
        }))
        setExtraTokens(map?.extraTokens || [])
        setTokens(tokensFromCombat);
    }
    }, [combat]);

    function handleDragEnd(ev: any) {
      let token = tokens.find((x: DroppableToken) => x.id === ev.active.id);
      let extraToken = extraTokens.find((x: DroppableToken) => x.id === ev.active.id);
      if (token) {
        token["data"]["position"] = {
          x: token?.data?.position?.x + ev.delta.x,
          y: token?.data?.position?.y + ev.delta.y
        }
        
        const _tokens = tokens.map((x) => {
          if (x.id === token?.id) return token;
          return x;
        });

        const newCombat = {...combat}
        const updatedCharacterIndex = newCombat?.combatCharacterArray?.findIndex((character, index) => `${index}-${character.name}` === token?.id)
        newCombat.combatCharacterArray[updatedCharacterIndex] = { ...newCombat?.combatCharacterArray[updatedCharacterIndex], position: { x: token.data.position.x, y: token.data.position.y } }
        update({...newCombat})
        

        setTokens(_tokens);
      } else if (extraToken) {
        extraToken["data"]["position"] = {
          x: extraToken?.data?.position?.x + ev.delta.x,
          y: extraToken?.data?.position?.y + ev.delta.y
        }

        const updatedTokenIndex = map?.extraTokens?.findIndex((token) => token.id === extraToken?.id) || 0;
        const { extraTokens = [] } = map;
        extraTokens[updatedTokenIndex] = {...extraToken}
        update({...combat, map: {...map, extraTokens}})

        setExtraTokens(extraTokens);
      }

      setSelectedToken(null);
    }

    const handleDragMove = (ev: any) => {
      let extraToken = extraTokens.find((x: DroppableToken) => x.id === ev.active.id);
      if (extraToken) {
        console.log("SEL SELECTED")
        setSelectedToken(extraToken);
      }
    }

    return (
      <div>
        <div>
          <Typography>{combat?.name}</Typography>
          <Button onClick={() => setIsSettingsDrawerOpen(true)}>SETTINGS</Button>
          <Spacer height={24} />
          <SettingsDrawer
            isOpen={isSettingsDrawerOpen}
            onClose={() => setIsSettingsDrawerOpen(false)}
            map={map}
            setMap={(newMap) => {
              update({...combat, map: {...newMap}});
            }}
            isPlayer={isPlayer}
          />
        </div>
        <div className={css.CombatMapContainer} ref={mapRef} id="CombatMap">
          <DndContext onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
            <Map
              mapImage={map?.mapImage}
              cols={map?.columns}
              rows={map?.rows}
              tokenSize={map?.tokenSize || 32}
              hideGrid={map?.hideGrid}
              mapColor={map?.mapColor}
              gridColor={map?.gridColor}
            >
              {extraTokens.map((token) => (
                <Token
                  styles={{
                    position: "absolute",
                    left: `${token?.data?.position?.x}px`,
                    top: `${token?.data?.position?.y}px`
                  }}
                  id={token.id}
                  disabled={token?.disabled}
                  content={
                  <ExtraTokenContent
                    image={token.data.image}
                    tokenSize={map?.tokenSize || 32}
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
                    left: `${data?.position?.x}px`,
                    top: `${data?.position?.y}px`
                  }}
                  id={token.id}
                  content={<CharacterTokenContent character={data} tokenSize={map?.tokenSize || 32} isCurrentTurn={currentTurnIndex === index && data?.playerDocId} />}
                />
              )})}
            </Map>
          </DndContext>
        </div>
      </div>
    );
};

export default CombatMap;