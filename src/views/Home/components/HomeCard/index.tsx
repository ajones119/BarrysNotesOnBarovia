import css from "./HomeCard.module.scss";
import { Typography } from "@components/Typography/Typography";
import { useNavigate } from "react-router-dom";

type HomeCardProps = {
    backImage?: string;
    frontImage?: string;
    title?: string;
    href?: string;
};

const HomeCard = ({
    backImage,
    frontImage,
    title,
    href = ""
}: HomeCardProps) => {
    const navigate = useNavigate();


    return (
    <div className={css.imageCard} onClick={() => navigate(href)} >
        <img className={css.imageBottom} src={backImage} alt="castle" />
        <img className={css.imageTop} src={frontImage} alt="barry" />
        <Typography color="primary" size="xtraLarge" weight="bolder" className={css.label} >{title}</Typography>

      </div>
    );
}

export default HomeCard