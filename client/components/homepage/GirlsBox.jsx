import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {GirlCard} from 'UI';

const GET_GIRLS = gql`
    {
        employees(count: 15) {
            data {
                id
                name
                address
                isVip
                isNew
                photos {
                    id
                    thumb_url
                }
            }
        }
    }
`;

function GirlsBox() {
    const {loading, error, data: { employees }} = useQuery(GET_GIRLS);


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;

    return (
        <div className="girls flex flex-col mt-7">
            {employees && employees.data.map(girl => console.log(girl) || (
                <GirlCard
                    girl={girl}
                />
            ))}
        </div>
    );
}

export default GirlsBox;
