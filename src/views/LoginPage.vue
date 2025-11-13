<script lang="ts" setup>
import {Button} from "@/components/ui/button";
import {apiPost} from "@/http";
import {AxiosResponse} from "axios";
import {LoginRequest, TokenLoginRequest, User} from "@/models/app/user";
import {useUserStore} from "@/stores/userStore";
import {useRouter} from "vue-router";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import InputComponent from "@/components/app/form/InputComponent.vue";
import FormComponent from "@/components/app/form/FormComponent.vue";
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {useNotify} from "@/helpers";
import ContainerComponent from "@/components/app/ContainerComponent.vue";
import PolicyComponent from "@/components/app/PolicyComponent.vue";

const $user = useUserStore()
const $router = useRouter()
const $notify = useNotify()

const LoginSchema = toTypedSchema<LoginRequest>(z.object({
  email: z.string({message: 'Email Required'}).email({message: 'Email Invalid'}),
  password: z.string({message: 'Password Required'})
}))

const TokenLoginSchema = toTypedSchema<TokenLoginRequest>(z.object({
  token: z.string({message: 'Token Required'}).min(6, {message: 'Token Invalid'})
}))

function login(data: LoginRequest) {
  apiPost<User>('/auth/login', data).then((res: AxiosResponse<User>) => {
    $user.commit('login', res.data)
    $router.push('/players').then(() => notify.success('app.login_success'))
  }).catch(() => {
    $notify.error('app.login_fail')
  })
}

function loginPlayer(data: TokenLoginRequest) {
  apiPost('/auth/login', data).then((res: AxiosResponse<User>) => {

  }).catch(() => {
    $notify.error('app.login_token_fail')
  })
}
</script>

<template>
  <ContainerComponent>
    <Tabs class="w-full" default-value="trainer">
      <TabsList class="w-full mb-5">
        <TabsTrigger value="trainer">
          {{ $t('app.trainer') }}
        </TabsTrigger>
        <TabsTrigger value="player">
          {{ $t('app.player') }}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="trainer">

        <FormComponent :schema="LoginSchema" @submit="login">
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
            >
              <a class="ml-auto text-sm underline-offset-4 hover:underline" href="#">
                {{ $t('app.password_forgot') }}
              </a>
            </InputComponent>
          </template>

          <template #submit>
            <Button class="w-full" type="submit">
              {{ $t('app.login') }}
            </Button>
          </template>
        </FormComponent>

        <div class="text-center text-sm mt-5">
          {{ $t('app.no_account') }}
          <router-link class="underline underline-offset-4" to="/signup">
            {{ $t('app.register') }}
          </router-link>
        </div>
      </TabsContent>
      <TabsContent value="player">

        <FormComponent :schema="TokenLoginSchema" @submit="loginPlayer">
          <template #form>
            <InputComponent
                :label="$t('app.player_token')"
                name="token"
            />
          </template>

          <template #submit>
            <Button class="w-full" type="submit">
              {{ $t('app.login') }}
            </Button>
          </template>
        </FormComponent>
      </TabsContent>
    </Tabs>

    <PolicyComponent/>

  </ContainerComponent>
</template>
