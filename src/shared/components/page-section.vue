<template lang="pug">
.page-section
    .page-section__head(v-if='type')
        .page-section__head-tag(:class='type')
    .page-section__content
        text.page-section__content-title(:class='{ distraction: !subTitle }') {{ title }}
        text.page-section__content-sub(
            :class='{ distraction: !subTitle }'
            v-if='subTitle'
        ) {{ subTitle }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PageContainer extends Vue {
    @Prop({
        type: String,
        default: 'line'
    })
    public type: string

    @Prop({
        type: String,
        default: ''
    })
    public title: string

    @Prop({
        type: String,
        default: ''
    })
    public subTitle: string
}
</script>

<style scoped>
.page-section {
    position: relative;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    margin-top: 10px;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    height: 50px;
    background-color: #f8f8f8;
    /* #ifdef APP-NVUE */
    /* #endif */
    font-weight: normal;
}

/* #ifndef APP-NVUE */
/* #endif */
.page-section__head {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
}

.line {
    height: 15px;
    background-color: #c0c0c0;
    border-radius: 5px;
    width: 3px;
}

.circle {
    width: 8px;
    height: 8px;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    background-color: #c0c0c0;
}

.page-section__content {
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    flex-direction: column;
    flex: 1;
    color: #333;
}

.page-section__content-title {
    font-size: 14px;
    color: #333;
}

.distraction {
    flex-direction: row;
    align-items: center;
}

.page-section__content-sub {
    font-size: 12px;
    color: #999;
}
</style>
