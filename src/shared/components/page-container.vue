<template lang="pug">
.page-container
    slot
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PageContainer extends Vue {}
</script>
