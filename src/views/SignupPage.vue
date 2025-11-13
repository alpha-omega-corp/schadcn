<script lang="ts" setup>
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {apiPost} from "@/http";
import {AxiosResponse} from "axios";
import {RegisterRequest, User} from "@/models/app/user";
import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import InputComponent from "@/components/app/form/InputComponent.vue";
import FormComponent from "@/components/app/form/FormComponent.vue";
import {Button} from "@/components/ui/button";
import ContainerComponent from "@/components/app/ContainerComponent.vue";
import PolicyComponent from "@/components/app/PolicyComponent.vue";
import {useNotify} from "@/helpers";

const $user = useUserStore()
const $router = useRouter()
const $notify = useNotify()

const RegisterSchema = toTypedSchema<RegisterRequest>(z.object({
  email: z.string({message: 'Email Required'}).email({message: 'Email Invalid'}),
  password: z.string({message: 'Password Required'}),
  confirmation: z.string({message: 'Confirmation required'})
}))

function register(data: RegisterRequest) {
  apiPost<User>('/auth/register', data).then((res: AxiosResponse<User>) => {
    $user.commit('login', res.data)
    $router.push('/register/confirmation').then(() => notify.success('app.signup_confirm'))
  }).catch(() => {
    $notify.error('app.signup_fail')
  })
}

</script>

<template>
  <ContainerComponent>
    <div class="container flex flex-col gap-6">
      <Card>

        <CardHeader class="text-center">
          <CardTitle class="text-xl">
            {{ $t('app.signup_title') }}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div class="grid gap-6">
            <FormComponent :schema="RegisterSchema" @submit="register">
              <template #form>
                <InputComponent
                    :autocomplete="true"
                    :label="$t('app.email')"
                    name="email"
                    type="email"/>
                <InputComponent
                    :label="$t('app.password')"
                    name="password"
                    type="password"
                />
                <InputComponent
                    :label="$t('app.password_confirm')"
                    name="confirmation"
                    type="password"
                />
              </template>

              <template #submit>
                <Button class="w-full" type="submit">
                  {{ $t('app.signup') }}
                </Button>
              </template>
            </FormComponent>

            <div class="text-center text-sm">
              {{ $t('app.have_account') }}
              <router-link class="underline underline-offset-4" to="/login">
                {{ $t('app.login') }}
              </router-link>
            </div>
          </div>
        </CardContent>
      </Card>

      <PolicyComponent/>
    </div>
  </ContainerComponent>
</template>
