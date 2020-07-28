import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import SignIn from "./sign-in";

jest.mock(`react-router-dom`);

configure({adapter: new Adapter()});

const Settings = {
  login: `vasya.petrov@yandex.ru`,
  password: `12345qwerty`,
};

it(`Should form be submited`, () => {
  const onSubmitHandler = jest.fn();

  const signIn = mount(
      <SignIn
        onSubmit={onSubmitHandler}
        isValid={true}
      />
  );

  const {loginRef, passwordRef} = signIn.instance();
  loginRef.current.value = Settings.login;
  passwordRef.current.value = Settings.password;

  const form = signIn.find(`.sign-in__form`);
  form.simulate(`submit`);
  expect(onSubmitHandler).toHaveBeenCalledTimes(1);
  expect(onSubmitHandler).toHaveBeenCalledWith(Settings);
});
