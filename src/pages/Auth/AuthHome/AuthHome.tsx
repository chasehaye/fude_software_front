import Button from '../../../componenets/Button/Button.tsx';

function Auth() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col sm:flex-row gap-20 items-center lg:gap-60">
          <Button text={'Sign Up'} link={'/signup'} />
          <Button text={'Login'} link={'/login'} />
        </div>
      </div>
    </>
  );
}

export default Auth;
