<h3 align="center">
  @sigmie/vue
</h3>

<p align="center">
  Vue JS tools for Sigmie application.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@sigmie/vue"><img src="https://img.shields.io/npm/dt/@sigmie/react.svg" alt="Total Downloads"></a>
  <a href="https://github.com/sigmie/vue/releases"><img src="https://img.shields.io/npm/v/@sigmie/react.svg" alt="Latest Release"></a>
  <a href="https://github.com/sigmie/vue/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@sigmie/react.svg" alt="License"></a>
</p>

## Installation

```sh
npm install @sigmie/vue
```

<!-- ## Documentation -->

<!-- For full documentation, visit [sigmie.com](https://sigmie.com). -->

### Example usage
```jsx
  <SigmieSearch
            :debounce-ms="250"
            :query="''"
            :per-page="10"
            :search="indexName"
            :api-key="apiKey"
            :sort="'_score'"
            :filters="''"
            :application-id="applicationId"
            v-slot="{ hits, facets, total, loading, processing_time_ms }"
        >

        <div v-for="hit in hits">
            {{ hit }}
        </div>

  </SigmieSearch>
```
