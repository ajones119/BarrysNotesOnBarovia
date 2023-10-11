import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Typography } from "../Typography/Typography";
import { CharacterAction } from "@model/BaseCharacter";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useList } from "../../hooks/useList";
import useDeepCompareEffect from "use-deep-compare-effect";

declare interface ActionsInputProps {
    title: string,
    value: CharacterAction[],
    onChange: (value: CharacterAction[]) => void
}

const ActionsInput = ({
    title = "Action",
    value,
    onChange
}: ActionsInputProps) => {

    const {
        insert,
        listWithIds,
        removeAt,
        replaceAt,
        list
    } = useList(value)

    useDeepCompareEffect(() => {
        onChange([...list])
    }, [list])

    return (
        <div>
            <TableContainer>
                <TableHead>
                    <TableCell style={{width: "40%"}}>
                        <Typography color="light" size="large" weight="bolder">
                            {title}
                        </Typography>
                    </TableCell>
                    <TableCell style={{width: "40%"}}>
                        <Typography color="light" size="large" weight="bolder">
                            Description
                        </Typography>
                    </TableCell>
                    <TableCell style={{width: "20%"}}>
                        <Typography color="light" size="large" weight="bolder">
                            <Button onClick={() => insert({name: "", bonus: 0})}><FontAwesomeIcon icon={faPlus} /></Button>
                        </Typography>
                    </TableCell>
                </TableHead>
                {
                    listWithIds?.map(({data: action, _id}, index) => 
                        <TableRow key={`${_id}`}>
                            <TableCell style={{width: "40%"}}>
                                <TextInput value={action?.name} onChange={(value) => replaceAt(index, {...action, name: value})} />
                            </TableCell>
                            <TableCell style={{width: "40%"}}>
                                <TextInput value={action?.description} onChange={(value) => replaceAt(index, {...action, description: value})} />
                            </TableCell>
                            <TableCell style={{width: "20%"}}>
                                <Button onClick={() => removeAt(index)}><FontAwesomeIcon icon={faMinus} /></Button>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableContainer>
        </div>
    );
}

export default ActionsInput;
