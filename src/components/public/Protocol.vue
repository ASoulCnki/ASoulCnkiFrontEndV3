<template>
  <div class="protocol-content">
    <p class="whitespace-pre-line leading-loose">欢迎您使用枝网查重平台服务（以下简称“本服务”）！《枝网查重平台用户协议》（以下简称“本协议”）为您（以下称“用户”）与开发者就使用本服务所达成的协议。
    使用本服务即表示您已审慎阅读、充分理解并同意遵守本协议下全部条款，特别是免除或者限制责任的条款。</p>
    <h3>一、定义及解释</h3>
    <ol>
      <li>用户：指符合本协议规定的条件，使用本服务的单位或个人。</li>
      <li>枝网查重平台：开发者为有小作文查重需求的用户提供的查重平台。枝网查重平台以Apache-2.0许可证开源于 <a href="https://github.com/ASoulCnki" target="_blank">ASoulCnki</a> </li>
      <li>枝网查重服务：指开发者按照本协议约定通过该枝网查重平台向用户提供的小作文查重服务。</li>
    </ol>

    <h3>二、枝网查重服务的内容</h3>

    <ol>
      <li>用户通过枝网查重平台的相关页面，向开发者提交委托小作文查重服务请求。</li>
      <li>用户提交查重内容：用户通过枝网查重平台相关页面向开发者上传需要进行查重的小作文。</li>
    </ol>

    <h3>三、双方权利义务</h3>

    <ol>
      <li>
        用户在使用本服务时，不得故意或者过失的损害本平台的合法权益，不得利用本查重平台直接或者间接的从事违反所在国家、地区的法律以及社会公德的行为。
      </li>
      <li>
        本查重平台的检测报告仅仅是基于大数据技术自动生成，检测结果仅供参考之用，不作为正式依据，由此引起的相关问题开发者不承担任何责任。
      </li>
      <li>由于程序算法以及对比库的更新，检测报告可能会存在差异。</li>
      <li>
        开发者尊重作者知识产权，用户上传小作文进行检测时，开发者不对原文的合法性、真实性以及是否侵权承担任何形式的责任，因原文内容引起的一切纠纷由用户全部承担。
      </li>
      <li>用来进行检测的数据全部来自互联网公开数据，由数据版权引起的问题，开发者不承担任何责任。</li>
      <li>
        若因硬件故障或其它不可抗力而导致暂停服务或其他问题，于暂停服务期间造成的一切不便与损失，开发者不承担任何责任。
        由于查重系统的调整导致信息丢失和/或其他结果的，开发者不承担任何责任。因系统维护或升级等而需暂停服务时，开发者将事先公告。
      </li>
    </ol>

    <h3>四、隐私保护</h3>

    <ol>
      <li>开发者不会主动获取和存储用户的隐私信息。</li>
    </ol>

    <h3>五、协议的生效、修改和解释</h3>

    <ol>
      <li>本协议一经公布即生效。</li>
      <li>开发者有权随时根据法律、法规及规范性文件的变化以及互联网的发展情况，不断修改和完善本协议内容，修改后的协议公布于查重平台网站上。如果不同意开发者对本协议相关条款所做的修改，用户有权停止使用查重服务。如果用户继续使用查重服务，则视为用户接受开发者对本协议相关条款所做的修改。</li>
    </ol>

    <h3>六、其他</h3>

    <ol>
      <li>最终解释权归枝网项目组所有。</li>
      <li>应该不会有人看完用户协议吧，全看完的话mua你一下</li>
    </ol>

    <div class="text-center my-8">
      <p class="my-2 font-bold">开源协议</p>
        <span class="iconfont icon-balance text-3xl"/>
      <p>Apache License 2.0</p>
    </div>
  </div>
</template>

<style scoped>
ol { @apply list-decimal; }

.protocol-content {
  height: 24rem;
  @apply box-border w-full px-4 leading-relaxed break-normal overflow-y-scroll;
}

.protocol-content ol { @apply break-all pl-4; }

.protocol-content li { @apply break-all py-1; }

h3 { @apply font-bold text-sm my-3;}

a {
  @apply text-blue-500;
}
</style>