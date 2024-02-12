<template>
  <template v-if="state.inited">
    <slot v-bind="state"></slot>
  </template>
</template>

<script setup>
import { reactive, defineProps, watch, onBeforeMount, ref } from "vue";

let props = defineProps({
  url: {
    type: String,
    default: null,
  },
  search: {
    type: String,
    default: "",
  },
  applicationId: {
    type: String,
    default: "",
  },
  apiKey: {
    type: String,
    default: "",
  },
  page: {
    type: Number,
    default: 1,
  },
  query: {
    type: String,
    default: "",
  },
  filters: {
    type: String,
    default: "",
  },
  facets: {
    type: String,
    default: "",
  },
  perPage: {
    type: Number,
    default: 10,
  },
  sort: {
    type: String,
    default: "_score",
  },
  debounceMs: {
    type: Number,
    default: 150,
  },
});

let state = reactive({
  autocomplete: [],
  hits: {},
  total: 0,
  page: 1,
  loading: false,
  inited: false,
  facets: {},
  processing_time_ms: 0,
  per_page: 10,
  last_page: 0,
  current_page: 1,
  from: 0,
  to: 0,
});

onBeforeMount(() => {
  urls.value = [
    `https://${props.applicationId}-a.sigmie.app/v1/search/${props.search}`,
    `https://${props.applicationId}-b.sigmie.app/v1/search/${props.search}`,
    `https://${props.applicationId}-c.sigmie.app/v1/search/${props.search}`,
  ];

  search();
});

let urls = ref([]);
let currentUrlIndex = 0;

function getNextUrl() {
  const url = urls.value[currentUrlIndex];

  currentUrlIndex = (currentUrlIndex + 1) % urls.value.length;

  return url;
}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

let search = function () {
  state.loading = true;

  const body = {
    query: props.query,
    per_page: props.perPage,
    filters: props.filters,
    facets: props.facets,
    page: props.page,
    sort: props.sort,
  };

  const url = props.url ? props.url : getNextUrl();

  fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      "X-Sigmie-API-Key": props.apiKey,
      "X-Sigmie-Application": props.applicationId,
    },
    redirect: "follow",
    body: JSON.stringify(body),
  })
    .then((respone) => {
      return respone.json();
    })
    .then((response) => {
      if (response.error) {
        throw new Error(response.message, { cause: response });
      }

      state.hits = response.hits;
      state.total = response.total;
      state.facets = response.facets;
      state.page = response.page;
      state.autocomplete = response.autocomplete;
      state.processing_time_ms = response.processing_time_ms;
      state.current_page = response.page;
      state.last_page = Math.ceil(response.total / props.perPage);
      state.from = (response.page - 1) * props.perPage + 1;
      state.to = Math.min(response.page * props.perPage, response.total);
      state.per_page = response.perPage;
      state.loading = false;
      state.inited = true;
    });
};

watch(props, debounce(search, props.debounceMs));
</script>
