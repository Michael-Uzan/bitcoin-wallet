'use strict';

export const SHOW_USER_MSG = 'showUserMsg';

import Vue from 'vue';

const eventBus = new Vue();

export default eventBus;

export function showUserMsg(txt, type = 'success') {
    eventBus.$emit(SHOW_USER_MSG, { txt, type });
}

// eventBus.$on('puk', (power) =>{
//     console.log('Puk happened, power: ', power);
// })

// setTimeout(()=>{
//     eventBus.$emit('puk', 7)
// }, 2000)