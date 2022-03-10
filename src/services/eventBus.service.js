'use strict';

export const SHOW_USER_MSG = 'showUserMsg';

import Vue from 'vue';

const eventBus = new Vue();

export default eventBus;

export function showUserMsg(txt, type = 'success') {
    eventBus.$emit(SHOW_USER_MSG, { txt, type });
}

