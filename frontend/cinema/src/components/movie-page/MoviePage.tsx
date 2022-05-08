import {Movie} from "../../interfaces/Movie";
import {useParams} from "react-router-dom";
import {useGetMovieService} from "../../services/getMovie";

export const MoviePage = () => {
    const {id} = useParams();
    const service = useGetMovieService(id);

    return (
        <div>
            <h2>
                {!service.loading && service.data?.title}
            </h2>
            <p>
                {!service.loading && service.data?.description}
            </p>
        </div>
    )
}
