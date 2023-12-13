import { useCombat, useUpdateInitiative } from "@services/CombatService";
import React, { useState } from "react";
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

type DroppableToken = {
  id: string,
  data: any
}

const CombatMap = ({isPlayer = false, combatIdOverride = "", defaultMapPosition = {x: 0, y: 0}}) => {
    const { combatId, campaignId = "" } = useParams();

    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

    const [tokens, setTokens] = useState<DroppableToken[]>([]);
    const [extraTokens, setExtraTokens] = useState<DroppableToken[]>([]);

    const [mapPosition, setMapPosition] = useState<{x: number, y: number}>(defaultMapPosition)

    const { combat, isLoading, isRefetching } = useCombat(combatId || combatIdOverride);
    const { combatCharacterArray = [], map = {extraTokens: []}, currentTurnIndex } = combat;
    const update = useUpdateInitiative(combat);

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
      } else if (ev.active.id === "map") {
        setMapPosition({
          x: mapPosition.x + ev.delta.x,
          y: mapPosition.y + ev.delta.y
        })
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
              console.log("set map", map)
              update({...combat, map: {...newMap}});
            }}
          />
        </div>
        <div className={css.CombatMapContainer}>
          <DndContext onDragEnd={handleDragEnd}>
            <Map
              mapImage={map?.mapImage}
              cols={map?.columns}
              rows={map?.rows}
              styles={{
                position: "absolute",
                left: `${mapPosition.x}px`,
                top: `${mapPosition.y}px`
              }}
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
                  content={<ExtraTokenContent
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
                const { conditions } = data;
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