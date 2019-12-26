<style>
@import "~ant-design-vue/dist/antd.css";
#app {
  min-height: 100%;
}
#app .ant-layout-content {
  padding: 24px;
}
</style>

<template>
  <a-layout id="app">
    <a-layout-content>
      <a-form>
        <a-form-item label="网址" :label-col="labelCol" :wrapper-col="wrapperCol" required>
          <template slot="extra">
            完整的网站网址（例：
            <a-tag @click="url = 'https://coolvox.com'">https://coolvox.com</a-tag>）
          </template>
          <a-input v-model="url"></a-input>
        </a-form-item>
        <a-form-item label="推广来源" :label-col="labelCol" :wrapper-col="wrapperCol" required>
          <template slot="extra">
            引荐来源（例：
            <a-tag @click="utm.utm_source = 'google'">google</a-tag>
            <a-tag @click="utm.utm_source = 'baidu'">baidu</a-tag>
            <a-tag @click="utm.utm_source = 'sogou'">sogou</a-tag>
            <a-tag @click="utm.utm_source = 'email'">email</a-tag>
            <a-tag @click="utm.utm_source = 'sms'">sms</a-tag>）
          </template>
          <a-input v-model="utm.utm_source"></a-input>
        </a-form-item>
        <a-form-item label="推广媒介" :label-col="labelCol" :wrapper-col="wrapperCol" required>
          <template slot="extra">
            推广媒介（例：
            <a-tag @click="utm.utm_medium = 'sem'">sem</a-tag>
            <a-tag @click="utm.utm_medium = 'edm'">edm</a-tag>
            <a-tag @click="utm.utm_medium = 'mdm'">mdm</a-tag>）
          </template>
          <a-input v-model="utm.utm_medium"></a-input>
        </a-form-item>
        <a-form-item label="推广名称" :label-col="labelCol" :wrapper-col="wrapperCol" required>
          <template slot="extra">
            产品、促销代码或口号（例：
            <a-tag @click="utm.utm_campaign = '202001'">202001</a-tag>）
          </template>
          <a-input v-model="utm.utm_campaign"></a-input>
        </a-form-item>
        <a-form-item label="推广关键字" :label-col="labelCol" :wrapper-col="wrapperCol" extra="付费关键字">
          <a-input v-model="utm.utm_term"></a-input>
        </a-form-item>
        <a-form-item label="活动内容" :label-col="labelCol" :wrapper-col="wrapperCol" extra="用于区分广告">
          <a-input v-model="utm.utm_content"></a-input>
        </a-form-item>
        <a-divider></a-divider>
        <a-form-item label="推广链接" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-textarea ref="url" :value="utmUrl" :autosize="{ minRows: 3 }" />
        </a-form-item>
        <a-form-item
          :wrapper-col="{
            xs: { span: 24 },
            sm: { span: 12, offset: 4 }
          }"
        >
          <a-button type="primary" @click="copyUrl">复制</a-button>
          <a
            :href="`http://sa.sogou.com/gettiny?url=${encodeURIComponent(this.utmUrl)}`"
            target="_blank"
            :style="{ marginLeft: '8px' }"
          >
            <a-button>转为短链接</a-button>
          </a>
        </a-form-item>
      </a-form>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      url: null,
      utm: {
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_term: null,
        utm_content: null
      }
    };
  },
  computed: {
    utmUrl() {
      const { url, utm } = this;
      let utmUrl;
      try {
        utmUrl = new URL(url);
      } catch (e) {
        return "";
      }
      Object.keys(utm).forEach(item => {
        if (!utm[item]) return;
        utmUrl.searchParams.set(item, utm[item]);
      });
      return utmUrl ? utmUrl.href : "";
    }
  },
  methods: {
    copyUrl() {
      if (!this.utmUrl.length) return;
      let success = false;
      const range = document.createRange();
      range.selectNode(this.$refs.url.$el);

      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);

      try {
        success = document.execCommand("copy");
      } catch (e) {
        // No action.
      }

      window.getSelection().removeAllRanges();

      if (success) {
        this.$message.success("已成功复制至剪贴板");
      } else {
        this.$message.error("复制失败，请手动复制");
      }
    }
  }
};
</script>
