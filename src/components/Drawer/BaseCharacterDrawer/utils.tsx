
export const calculateAbilityScoreModifier = (score: number) => {
    return `${Math.floor((score - 10)/2) >= 0 ? "+" : ""}${Math.floor((score - 10)/2)}`
}