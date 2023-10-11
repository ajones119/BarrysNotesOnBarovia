import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Typography } from "../Typography/Typography";
import { SkillProficiency } from "@model/BaseCharacter";
import { TextInput } from "../TextInput/TextInput";
import { Button } from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useList } from "@hooks/useList";
import useDeepCompareEffect from "use-deep-compare-effect";

declare interface SkillsInputProps {
    value: SkillProficiency[],
    onChange: (value: SkillProficiency[]) => void
    title?: string
}

const SkillsInput = ({
    value,
    onChange,
    title = "Skills"
}: SkillsInputProps) => {

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
                    <TableCell style={{width: "20%"}}>
                        <Typography color="light" size="large" weight="bolder">
                            Bonus
                        </Typography>
                    </TableCell>
                    <TableCell style={{width: "40%"}}>
                        <Typography color="light" size="large" weight="bolder">
                            <Button onClick={() => insert({name: "", bonus: 0})}><FontAwesomeIcon icon={faPlus} /></Button>
                        </Typography>
                    </TableCell>
                </TableHead>
                {
                    listWithIds?.map(({data: skill, _id}, index) => 
                        <TableRow key={`${_id}`}>
                            <TableCell style={{width: "40%"}}>
                                <TextInput value={skill?.name} onChange={(value) => replaceAt(index, {...skill, name: value})} />
                            </TableCell>
                            <TableCell style={{width: "20%"}}>
                                <TextInput number value={skill?.bonus} onChange={(value) => replaceAt(index, {...skill, bonus: Number(value || 0)})} />
                            </TableCell>
                            <TableCell style={{width: "40%"}}>
                                <Button onClick={() => removeAt(index)}><FontAwesomeIcon icon={faMinus} /></Button>
                            </TableCell>
                        </TableRow>
                    )
                }
            </TableContainer>
        </div>
    );
}

export default SkillsInput;
