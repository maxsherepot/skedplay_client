import {useRouter} from "next/router";

export default () => {
  const {query: {lang}} = useRouter();

  return 'test ' + lang;
};