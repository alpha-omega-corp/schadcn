<script lang="ts">


import {apiGet} from "@/http.ts";

const getTeam = () => {
  apiGet<Team>(``)
}


</script>

<template>

</template>