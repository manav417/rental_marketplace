<script setup lang="ts">
import { storeToRefs } from "pinia";
import { UserStore } from "@/stores/userStore";
import type { PropType } from "vue";
import MapPinIcon from "@/assets/images/map/map-pin.svg";
import MapPinIconActive from "@/assets/images/map/map-pin-active.svg";
import { GMapClusterStyles } from "@/utilities/GMapClusterStyles";
import type { MapMarker } from "@/interfaces/MapMarker";
import { GoogleMap, Marker, CustomMarker, CustomControl, MarkerCluster, InfoWindow } from "vue3-google-map";

</script>

<template>
  <GoogleMap
    :api-key="api_key"
    :style="detail == true ? 'width: 100%; height: 400px; border-radius: 0.75rem' : 'width: 100%; height: 100vh; border-radius: 0.75rem'"
    :center="center"
    :zoom="zoom"
    map-type-id="roadmap"
    :zoomControl="true"
    :mapTypeControl="false"
    :scaleControl="true"
    :streetViewControl="false"
    :rotateControl="false"
    :fullscreenControl="false"
    :disableDefaultUi="false"
    gestureHandling="greedy"
    @click="hidePop"
  >
    <MarkerCluster v-if="detail == false" :render="true">
      <CustomMarker v-for="marker in markers" :options="{ position: marker.position }" :key="marker.id" :style="marker.id == selectedMarker ? 'z-index: 10' : 'z-index: 0'">
        <div :class="marker.id == selectedMarker ? 'relative z-10' : 'relative z-0'">
          <div v-if="marker.id == selectedMarker" class="w-[280px]  bg-white rounded-xl absolute -top-[255px] right-0 z-10" @click="gotoDeetail(marker.id)">
            <div>
              <img :src="marker['images'][0]['url']" class="w-full h-[156px] rounded-t-lg z-10"/>
            </div>
            <div class="p-2 z-10">
              <p class="text-[14px] font-bold">
                {{ marker.title }}
              </p>
              <p class="text-[12px] mt-1">
                BDR: {{ marker.beds }} BTH: {{ marker.baths }}
              </p>
              <div class="flex items-center mt-3 justify-between">
                <p class="text-[14px]">
                  <span class="font-bold">{{marker.average_price}}</span> <span>/night (average)</span>
                </p>
                <div class="flex items-center ml-4 text-[14px]">
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.21836 5.42154L5.36389 4.81906L7.21706 1.06212C7.26767 0.959255 7.35094 0.875985 7.45381 0.82537C7.71178 0.698016 8.02527 0.804145 8.15425 1.06212L10.0074 4.81906L14.153 5.42155C14.2672 5.43787 14.3717 5.49175 14.4517 5.57339C14.5485 5.6728 14.6018 5.80655 14.5999 5.94523C14.5981 6.08392 14.5413 6.21621 14.442 6.31302L11.4426 9.23727L12.1512 13.3665C12.1678 13.4625 12.1572 13.5613 12.1205 13.6516C12.0839 13.742 12.0226 13.8202 11.9437 13.8775C11.8649 13.9348 11.7715 13.9688 11.6743 13.9757C11.5771 13.9827 11.4798 13.9622 11.3936 13.9167L7.68566 11.9672L3.97769 13.9167C3.87646 13.9706 3.75891 13.9886 3.64625 13.969C3.36215 13.92 3.17112 13.6506 3.2201 13.3665L3.92871 9.23727L0.929361 6.31302C0.847724 6.23302 0.793844 6.12852 0.777517 6.01423C0.733432 5.7285 0.932626 5.464 1.21836 5.42154Z" fill="black"/>
                  </svg>
                  <span class="font-bold">
                    {{marker.rating}}
                  </span>
                  <span class="text-gray-500">
                    &nbsp;({{marker.total_reviews }})
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div @click="selectMarker(marker)" :class="(marker.id == selectedMarker || marker.id == hoverId) ?  'w-[60px] h-[30px] bg-[#DE774A] text-white rounded-3xl text-[16px] font-bold flex items-center justify-center z-0 shadow-[1px_1px_10px_4px_rgba(0,0,0,0.15)]': checkMarker(marker.id) ? 'w-[60px] h-[30px] bg-gray-500  text-white rounded-3xl text-[16px] font-bold flex items-center justify-center z-0 hover:shadow-[1px_1px_10px_4px_rgba(0,0,0,0.30)] hover:shadow-[1px_1px_10px_4px_rgba(0,0,0,0.15)]' : 'w-[60px] h-[30px] bg-white  rounded-3xl text-[16px] text-[#333333] font-bold flex items-center justify-center z-0 hover:shadow-[1px_1px_10px_4px_rgba(0,0,0,0.30)] shadow-[1px_1px_10px_4px_rgba(0,0,0,0.15)]'">{{'$' + marker.average_price}}</div>
        </div>
      </CustomMarker>
    </MarkerCluster>
  </GoogleMap>
</template>

<script lang="ts">
const initialMapCenterPosition = {
  lat: 39.12481811454707,
  lng: -94.48379293445625,
};

export default {
  name: "LocationSearchMap",
  props: {
    markers: {
      type: Object as PropType<MapMarker[]>,
      required: true,
    },
    selected: {
      type: String,
      required: false,
    },
    hoverId: {
      type: String,
      required: false,
    },
    detail: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    const userStore = UserStore();
    const { clickedMakers: clickedMakers } = storeToRefs(userStore);

    const data = {
      center: initialMapCenterPosition,
      selectedMarker: "",
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        gestureHandling: "greedy",
      },
      clickedMakers: clickedMakers,
      api_key: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
      zoom: 4
    };
    return data;
  },
  mounted() {
    const vm = this;
    this.centerMap();
    if (this.selected) this.selectedMarker = this.selected;
  },
  methods: {
    // changeCenter() {
    //   let id = this.hoverId ? this.hoverId : this.selectedMarker;
    //   let marker = this.markers.filter((mk) => mk.id == id)[0];
    //   if(marker) {
    //     this.zoom = 6
    //     this.center = marker.position;
    //     return this.center;
    //   }else {
    //     return this.center
    //   }


    // },
    hidePop() {
      if (this.selectedMarker && this.selectedMarker != '') this.selectedMarker = '';
    },
    checkMarker(id: any) {
      return this.clickedMakers.includes(id);
    },
    gotoDeetail(id: any) {
      this.$router.push(`/listing-detail/${id}`);
    },

    selectMarker(marker: MapMarker) {
      if(this.selectedMarker == marker.id) {
        this.selectedMarker = '';
        return false
      }
      setTimeout(() => {
        this.selectedMarker = marker.id;
        this.center = marker.position;
        this.clickedMakers.push(marker.id);
      }, 500);
    },
    getMarkerIcon(id: string) {
      return {
        url: this.selectedMarker === id ? MapPinIconActive : MapPinIcon,
        scaledSize: { width: 35, height: 55 },
      };
    },
    centerMap() {
      const markers = this.markers;
      console.log("=====markert===========");
      console.log(markers);
      if (!markers.length) return initialMapCenterPosition;

      let lat = 0,
        lng = 0;
      for (let i = 0; i < markers.length; ++i) {
        lat += markers[i].position.lat;
        lng += markers[i].position.lng;
      }

      this.center = {
        lat: (lat /= markers.length),
        lng: (lng /= markers.length),
      };
    },
  },
};
</script>
