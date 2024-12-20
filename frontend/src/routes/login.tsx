import { createFileRoute, redirect } from "@tanstack/react-router";
import { z, ZodError } from "zod";
import { userSchema } from "../schema/schema";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useNavigate } from "@tanstack/react-router";
import { authenticate } from "@/services/auth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

type User = z.infer<typeof userSchema>;

function RouteComponent() {
  const navigate = useNavigate({ from: "/login" });

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      username: "",
      password: "",
    } as User,
    onSubmit: async (formData) => {
      //send to the backend
      try {
        //needs to collect user name
        const loginData = {
          json: {
            username: formData.value.username,
            password: formData.value.password,
          },
        };
        const res = await api.auth.login
          .$post(loginData, {
            headers: {
              "Content-Type": "application/json",
              "X-User-Agent": "hc",
              "Access-Control-Allow-Origin": "/*",
            },
          })
          .then(async (res) => {
            const isAuth = authenticate(res);
            const token = await isAuth ? true : false;
            token
            ? navigate({ to: "/dashboard" })
            : navigate({ to: "/signup" })
          });
      } catch (error) {
        console.error(error, ZodError);
      }
    },
    validators: {
      onChange: userSchema,
    },
  });

  return (
    <>
      <div className="w-full h-dvh border-2 p-2 flex flex-col justify-center items-center">
        <h1 className="text-5xl p-5">Sign In</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="border-2 bg-blue-300 p-4 h-1/3 w-1/2 rounded-2xl flex flex-col justify-around"
        >
          <div>
            <form.Field
              name="username"
              validators={{
                onChange: z.string(),
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: z.string().refine(
                  async (value) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return !value.includes("error");
                  },
                  {
                    message: `No 'error' allowed in username`,
                  }
                ),
              }}
              children={(field) => {
                return (
                  <>
                    <Input
                      placeholder="Username"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <div className="text-red-600 text-sm mt-1">
                        {field.state.meta.errors}
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>

          <div>
            <form.Field
              name="password"
              validators={{
                onChange: z.string(),
                onChangeAsyncDebounceMs: 500,
                onChangeAsync: z.string().refine(
                  async (value) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return !value.includes("error");
                  },
                  {
                    message: "[Field] No 'error' allowed in password",
                  }
                ),
              }}
              children={(field) => {
                return (
                  <>
                    <Input
                      placeholder="Password"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <div className="text-red-600 text-sm mt-1">
                        {field.state.meta.errors}
                      </div>
                    )}
                  </>
                );
              }}
            />
          </div>
          <Button type="submit" variant="outline">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
