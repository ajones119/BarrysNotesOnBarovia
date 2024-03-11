
import React, { useState } from "react";
import css from "./CustomTokens.module.scss"
import { Button } from "@components/Button/Button";
import CreateTokenModal from "@components/Modal/CreateCustomTokenModal";
import { useCustomTokens } from "@services/CustomTokensService";
import CustomTokenListItem from "./CustomTokenListItem";
import { CustomToken } from "@model/CombatMap";
import FloatingButtonContainer from "@components/FloatingButtonContainer";
import Spinner from "@components/Spinner";

const CustomTokens = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const {tokens, isLoading} = useCustomTokens();
    const [editToken, setEditToken] = useState<CustomToken | null> (null);

    if (isLoading) {
        return <Spinner />
    }

    return (
      <div className={css.customTokens}>
        <FloatingButtonContainer>
            <Button onClick={() => setIsCreateModalOpen(true)}>Create Token</Button>
        </FloatingButtonContainer>
        <div className={css.tokensList}>
            {tokens?.map(token => (
               <CustomTokenListItem token={token} onClick={() => {
                setEditToken(token);
               }} />
            ))}
        </div>
        <CreateTokenModal
            isOpen={isCreateModalOpen || !!editToken}
            onClose={() =>{
                setIsCreateModalOpen(false);
                setEditToken(null);
            }}
            editToken={editToken || undefined}
        />
    </div>
    );
}

export default CustomTokens;