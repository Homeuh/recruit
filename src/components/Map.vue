<template>
  <div class="map">
    <div class="office-address">
      <i class="el-icon-location"></i>
      <span>{{ address }}</span>
    </div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
    name: "Map",
    props: {
        address: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.initMap();
        this.showAddress();
    },
    data() {
        return {
            map: "",
            marker: "",
            geocoder: ""
        }
    },
    methods: {
        initMap() {
            this.map = new AMap.Map("container", {
                resizeEnable: true, //窗口大小调整
                // center: this.firstArr, //中心
                center: [116.478935, 39.997761],
                zoom: 11
            });
        },
        showAddress() {
            this.marker = new AMap.Marker();
            this.geocoder = new AMap.Geocoder({
                city: "全国", //城市设为北京，默认：“全国”
            });
            this.geocoder.getLocation(this.address, (status, result) => {
                console.log(result)
                if (status === 'complete'&&result.geocodes.length) {
                    const lnglat = result.geocodes[0].location
                    this.marker.setPosition(lnglat);
                    this.map.add(this.marker);
                    this.map.setFitView(this.marker);
                }else{
                    console.log('根据地址查询位置失败');
                }
            });
        }
    }
}
</script>

<style scoped>
.map{
    box-shadow: 0 0 10px rgba(0,0,0,.1);
}
.office-address{
    font-size: 16px;
    padding-left: 16px;
    height: 50px;
    line-height: 50px;
    background: #f6f6f8;
}
.office-address i{
    margin-right: 10px;
    color: #00c2b3;
}
#container{
    height: 225px;
}
</style>