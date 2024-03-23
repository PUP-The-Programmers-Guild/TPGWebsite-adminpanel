import LoginForm from '@/components/login/LoginForm';
import { Flex } from '@adobe/react-spectrum';

export default function Home() {

  const loginOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = Object.fromEntries(new FormData(e.currentTarget));

    //Submit to backend API
  }

  return (
    <>
      <Flex direction="column" alignItems="center" justifyContent="center" height="calc(100vh)">
          <LoginForm onSubmit={loginOnSubmit}/>
      </Flex>
    </>
  )
}
