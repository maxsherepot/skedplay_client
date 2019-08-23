import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {GirlCard} from 'UI';

const GET_GIRLS = gql`
    {
        employees(count: 15) {
            data {
                id
                name
                age
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
        <div className="girls flex flex-col mt-7 sm:flex-row sm:justify-start sm:flex-wrap -mx-4">
            {employees && employees.data.map(girl => (
                <div
                    className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-2"
                    key={girl.id}
                >
                    <GirlCard
                        girl={girl}
                    />
                </div>
            ))}
        </div>
    );
}

export default GirlsBox;
