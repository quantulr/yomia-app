import {Field as FormikField, FieldProps, Form, Formik} from "formik";
import {Button, Field, Input} from "@fluentui/react-components";

const Login = () => {
    // const [username, setUsername] = useState('')
    return (
        <>
            <Formik initialValues={{username: '', password: ''}} onSubmit={(values, {setSubmitting,}) => {
                setSubmitting(false)
                console.log(values)
            }}>
                {
                    ({values, errors, touched, handleSubmit, handleChange, handleBlur, isSubmitting}) =>
                        <Form>
                            {/*<input type='text' value={values.username} onChange={handleChange}/>*/}
                            <FormikField name={'username'} validate={(value: string) => {
                                let errorMessage;
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                                    errorMessage = 'Invalid email address';
                                }
                                return errorMessage;
                            }}>
                                {({meta}: FieldProps) => <><Field
                                    validationState={meta.touched && meta.error ? 'error' : 'none'}
                                    validationMessage={meta.touched && meta.error ? meta.error : ''}>
                                    <Input name={'username'} type={'text'} value={values.username}
                                           onChange={handleChange}
                                           onBlur={handleBlur}/>
                                </Field></>}
                            </FormikField>
                            {/*<Field>*/}
                            <Input type={"password"}
                                   name={"password"} onBlur={handleBlur} value={values.password}
                                   onChange={handleChange}/>
                            {/*</Field>*/}

                            <Button type={'submit'} disabled={isSubmitting}>
                                Submit
                            </Button>
                        </Form>
                }
            </Formik>
        </>
    );
};

export default Login;