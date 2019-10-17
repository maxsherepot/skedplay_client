import { useRouter } from 'next/router'

export default (context, target) => {
  const router = useRouter()

  if (context && context.res) {
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    router.replace(target);
  }
};
