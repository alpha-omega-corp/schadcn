<script lang="ts" setup>
import {LockIcon} from 'lucide-vue-next'
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import FeatureComponent from "@/components/app/home/FeatureComponent.vue";
</script>

<template>

  <section class="pt-32 pb-20 px-4 border-b-1 border-slate-200 mb-10">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
        Manage Your Team,<br/>
        <span class="text-blue-600">Win Every Match</span>
      </h1>
      <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        The complete football management platform to organize
        training, track performance, and achieve victory.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button class="text-lg px-8 py-6" size="lg">
          Start Free Trial
        </Button>
        <Button class="text-lg px-8 py-6" size="lg" variant="outline">
          Watch Demo
        </Button>
      </div>
      <p class="text-sm text-slate-500 mt-4">Free 14-day trial • No credit card required</p>
    </div>
  </section>

  <section>
    <div class="max-w-7xl mx-auto text-center">
      <h2 class="md:text-3xl font-bold text-slate-700 mb-6 leading-tight">
        What is an IDP?
      </h2>
      <p class="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        The complete football management platform to organize
        training, track performance, and achieve victory.
      </p>
    </div>

    <Card class="max-w-7xl mx-auto">

      <CardContent class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <FeatureComponent :description="$t('feature.team.description')"
                          :icon="LockIcon"
                          :title="$t('feature.team.title')"/>
        <FeatureComponent :description="$t('feature.schedule.description')"
                          :icon="LockIcon"
                          :title="$t('feature.schedule.title')"/>
        <FeatureComponent :description="$t('feature.milestone.description')"
                          :icon="LockIcon"
                          :title="$t('feature.milestone.title')"/>
      </CardContent>
    </Card>
  </section>
</template>
