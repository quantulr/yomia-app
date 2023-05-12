import { useFormik } from "formik";
import {
  Button,
  Card,
  CardFooter,
  Field,
  Image,
  Input,
} from "@fluentui/react-components";
import useSWR from "swr";
import request from "../lib/request.ts";
import useUserStore from "../store/user.tsx";

const fetcher = (url: string) =>
  request.get<never, { img: string; uuid: string }>(url);
const validate = (
  values: {
    username: string;
    password: string;
  } /* only available when using withFormik */
) => {
  const errors: { username?: string; password?: string } = {};
  if (!values.username) {
    errors.username = "Required";
  }
  /*else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.username)) {
        errors.username = 'Invalid email address';
    }*/
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};
const Login = () => {
  const login = useUserStore((state) => state.login);
  const { data, isLoading, mutate } = useSWR("/captchaImage", fetcher, {
    onSuccess: (data) => {
      console.log(data.uuid);
      formik.setValues((state) => ({ ...state, uuid: data.uuid }));
    },
  });
  const formik = useFormik({
    initialValues: {
      username: "admin",
      password: "admin123",
      code: "",
      uuid: "",
    },
    validate: validate,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      await login(values);
      setSubmitting(false);
    },
  });
  return (
    <div
      className={"h-screen flex justify-center items-center"}
      style={{ backgroundImage: `url(https://picsum.photos/1920/1080)` }}
    >
      <Card className={"w-3/12"}>
        <form onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
          <Field
            required
            label={"username"}
            validationMessage={formik.errors.username}
            validationState={
              formik.getFieldMeta("username").touched &&
              formik.getFieldMeta("username").error
                ? "error"
                : "none"
            }
          >
            <Input
              name={"username"}
              type={"text"}
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Field>
          <Field
            required
            label={"password"}
            className={"mt-2"}
            validationMessage={formik.errors.password}
            validationState={
              formik.getFieldMeta("password").touched &&
              formik.getFieldMeta("password").error
                ? "error"
                : "none"
            }
          >
            <Input
              type={"password"}
              name={"password"}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          </Field>
          <Field required label={"captcha"} className={"mt-2"}>
            <div className={"flex justify-between items-center"}>
              <Input
                name={"code"}
                className={"flex-auto"}
                onBlur={formik.handleBlur}
                value={formik.values.code}
                onChange={formik.handleChange}
              ></Input>
              <Image
                onClick={() => {
                  mutate();
                }}
                className={"ml-1"}
                height={32}
                width={86}
                src={
                  data && !isLoading
                    ? `data:image/gif;base64,${data.img}`
                    : undefined
                }
              ></Image>
            </div>
          </Field>
          <CardFooter className={"mt-4"}>
            <div className={"w-full flex justify-center items-center"}>
              <Button
                onClick={formik.submitForm}
                disabled={formik.isSubmitting}
              >
                Submit
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
