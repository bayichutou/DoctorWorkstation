<template>
  <el-row class="row_content" v-loading="loading">
    <el-col :span="8" class="cell_list">
      <ul>
        <li
          class="cell"
          @click="selectedPatient(index)"
          v-bind:class="{ 'selected-action': patient.isCheck }"
          v-bind:key="index"
          v-for="(patient, index) in patientList"
        >
          <section class="fx">
            <p class="cell_row__item" title="姓名">
              <i class="fc_main fs_big el-icon-s-custom"></i>
              <span>{{ patient.Name }}</span>
            </p>
            <p class="cell_row__item" title="年龄">
              <i class="fc_main el-icon-bank-card"></i>
              <span>{{ patient.Age + "岁" }}</span>
            </p>
          </section>
          <section class="cell_row">
            <p title="就诊编号">
              <i class="fc_main el-icon-bank-card"></i>
              <span>{{ patient.VisitNo }}</span>
            </p>
            <p>
              <i class="fc_main fs_big el-icon-collection-tag"></i>
              <span v-bind:class="{ fc_main: patient.Status == 1015 }">{{
                patient.Status == 1014 ? "未发药" : "已发药"
              }}</span>
            </p>
          </section>
        </li>
      </ul>
      <NoData v-if="!patientList.length" text="暂未查询到数据" />
    </el-col>
    <el-col :span="16" class="table_content bg_main">
      <div class="tools_bar">
        <el-button type="text" @click="dialog = true">筛选患者</el-button>
      </div>
      <div class="content_view" v-if="printInfo.length">
        <div class="tools_wrap">
          <el-button
            type="primary"
            v-if="currentPatient.Status == 1014"
            @click="sendDrug"
            >发药</el-button
          >
          <el-button icon="el-icon-printer" v-print="'#table_dispending'"
            >打印</el-button
          >
        </div>
        <div id="table_dispending" class="table_wrap">
          <el-row class="table_title">
            <el-col :span="24">
              <div style="position: relative;height: 44px; line-height: 44px;">
                <p
                  class="table_title__subordinate"
                  style="left: 0;font-size: 20px; top: 10px;"
                >
                  互联网
                </p>
                <p style="text-align: center;">
                  复旦大学附属华山医院 门诊取药副联
                </p>
                <p class="table_title__subordinate">
                  本联仅供核对，不作处方使用
                </p>
              </div>
            </el-col>
          </el-row>
          <!-- <el-row>
                        <div><span>No</span><span>73524184</span></div>
          </el-row>-->
          <el-row>
            <el-col :span="10">
              <div>
                <span class="spec_title">费别</span>
                <span class="spec_info">{{ printInfoObj.HealthCareType }}</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div>
                <span class="spec_title">窗口</span>
                <span class="spec_info"></span>
              </div>
            </el-col>
            <el-col :span="10">
              <div>
                <span class="spec_title">领药号码</span>
                <span class="spec_info"></span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div>
                <span class="spec_title">科别</span>
                <span class="spec_info">{{ printInfoObj.DeptName }}</span>
              </div>
            </el-col>
            <el-col :span="14">
              <div>
                <span class="spec_title">日期</span>
                <span class="spec_info">{{ printInfoObj.VisitTime }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <div style="display: flex;align-items: center;">
                <div class="spec_title">临床诊断</div>
                <div class="spec_info">
                  {{ printInfoObj.Diagnosis }}
                  <!-- <p><span>2</span><span></span></p>
                  <p><span>3</span><span></span></p>-->
                </div>
              </div>
            </el-col>
            <el-col :span="14" class="h100">
              <el-row class="vertical_align">
                <el-col :span="24">
                  <el-row class="display: flex;">
                    <el-col :span="7">
                      <div>
                        <span class="spec_title">医师</span>
                        <span class="spec_info">{{
                          printInfoObj.DoctorName
                        }}</span>
                      </div>
                    </el-col>
                    <el-col :span="12">
                      <div class="spec_title">
                        <span>签名</span>
                        <span class="spec_info"></span>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="24">
                  <div>
                    <span class="spec_title">皮试结果</span>
                    <span class="spec_info"></span>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="person">
            <el-col :span="5">
              <div>
                <span class="spec_title">姓名</span>
                <span class="spec_info">{{ currentPatient.Name }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <span class="spec_title">性别</span>
                <span class="spec_info">{{ printInfoObj.PatSex }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <span class="spec_title">年龄</span>
                <span class="spec_info">{{ currentPatient.Age }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <span class="spec_title">卡号</span>
                <span class="spec_info">{{ printInfoObj.CardNo }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div>R:</div>
            </el-col>
            <el-col :span="8">
              <div>药品名称</div>
            </el-col>
            <el-col :span="4">
              <div>规格</div>
            </el-col>
            <el-col :span="2">
              <div>数量</div>
            </el-col>
            <el-col :span="7">
              <div>用法</div>
            </el-col>
          </el-row>
          <div class="fg-1">
            <div v-for="(item, index) in printInfo" v-bind:key="index">
              <el-row>
                <el-col :span="3">
                  <div class="spec_info">
                    {{ item.StoreNum ? item.StoreNum : "-" }}
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="spec_info">{{ item.DrugName }}</div>
                </el-col>
                <el-col :span="4">
                  <div class="spec_info">{{ item.Specification }}</div>
                </el-col>
                <el-col :span="2">
                  <div class="spec_info">
                    {{ item.Dispensequantity + item.Dispenseunit }}
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="spec_info">{{ item.Method }}</div>
                </el-col>
              </el-row>
            </div>
          </div>
          <el-row>
            <el-col :span="24">
              <div>
                <span class="spec_title fc_red">联系人</span>
                <span class="spec_info fc_default">{{
                  printInfoObj.Receiver
                }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <span class="spec_title fc_red">联系电话</span>
                <span class="spec_info fc_default">{{
                  printInfoObj.TelNumber
                }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div>
                <span class="spec_title fc_red">地址</span>
                <span class="spec_info fc_default">{{
                  printInfoObj.Address
                }}</span>
              </div>
            </el-col>
          </el-row>
          <br />
          <el-row>
            <el-col :span="7">
              <div>
                <span class="spec_title">总金额(元)</span>
                <span class="spec_info">{{ printInfoObj.zPrice }}</span>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <span class="spec_title">收款员</span>
                <span class="spec_info"></span>
              </div>
            </el-col>
            <el-col :span="5">
              <div>
                <div>
                  <span class="spec_title">审核</span>
                  <span class="spec_info"></span>
                </div>
                <div>
                  <span class="spec_title">调配</span>
                  <span class="spec_info"></span>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div>
                <div>
                  <span class="spec_title">核对</span>
                  <span class="spec_info"></span>
                </div>
                <div>
                  <span class="spec_title">发药</span>
                  <span class="spec_info"></span>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
    <el-drawer
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="选择时间" :label-width="formLabelWidth">
            <el-date-picker
              class="date_picker"
              v-model="date"
              type="daterange"
              range-separator="至"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="dateChange()"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="选择药房" :label-width="formLabelWidth">
            <el-select
              v-model="value"
              placeholder="切换药房"
            >
              <el-option
                v-for="item in pharmacyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button size="medium" @click="cancelForm">取 消</el-button>
          <el-button
            size="medium"
            type="primary"
            @click="confirm"
            :loading="loading"
            >确 定</el-button
          >
        </div>
      </div>
    </el-drawer>
  </el-row>
</template>

<script>
import NoData from "../noData/noData";
import {
  getNameDetail,
  getPharmacyPrintInfo,
  updateState
} from "./dispending_api.js";
import { pharmacyList } from "./enum";
import {formatDate} from "../../api/util"

export default {
  name: "dispensing",
  components: {
    NoData
  },
  data() {
    return {
      dialog: false,
      loading: true,
      currentPatient: {},
      patientList: [],
      printInfo: [],
      printInfoObj: {},
      pharmacyList: pharmacyList,
      formLabelWidth: "80px",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      date: [
        formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7), 'yyyy-MM-dd'),
        formatDate(new Date(), 'yyyy-MM-dd')
      ],
      value: ""
    };
  },
  created() {
    this.getNameDetail();
  },
  methods: {
    handleClose(done) {
      done();
    },
    confirm() {
      this.getNameDetail();
      this.$refs.drawer.closeDrawer();
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },

    dateChange() {
      this.getNameDetail();
    },
    sendDrug() {
      let that = this;
      updateState({
        Body: {
          VisitNo: this.currentPatient.VisitNo
        }
      })
        .then(function() {
          that.currentPatient.Status = 1015;
        })
        .catch(function() {});
    },
    selectedPatient(index) {
      this.patientList.forEach(function(item) {
        item.isCheck = false;
      });
      this.patientList[index].isCheck = true;
      this.currentPatient = this.patientList[index];
      this.printInfoObj = {};
      this.printInfo = [];
      this.getPharmacyPrintInfo({
        Body: { VisitNo: this.patientList[index].VisitNo }
      });
    },
    getNameDetail() {
      let that = this;
      console.log(this.date[0].toString())
      getNameDetail({
        Body: {
          DispensedPharmacyCode: this.value,
          startDate: this.date[0],
          endDate: this.date[1]
        }
      })
        .then(res => {
          this.loading = false;
          that.patientList = res.data.Data.PageList;
          that.patientList[0].isCheck = true;
          that.currentPatient = that.patientList[0];
          that.getPharmacyPrintInfo({
            Body: { VisitNo: that.patientList[0].VisitNo }
          });
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getPharmacyPrintInfo(data) {
      let that = this;
      this.loading = true;
      getPharmacyPrintInfo(data)
        .then(function(res) {
          that.loading = false;
          if (res.data.Data.length) {
            res.data.Data[0].zPrice = 0;
            res.data.Data.forEach(function(item) {
              res.data.Data[0].zPrice += item.Dispensequantity * item.Price;
            });
            that.printInfoObj = res.data.Data[0];
            that.printInfo = res.data.Data;
          }
        })
        .catch(function() {});
    }
  }
};
</script>

<style scoped>
.date_picker {
  border: 0;
  border-bottom: 1px solid #ddd;
  border-radius: 0;
}
.row_content {
  height: 100%;
  overflow: hidden;
}

.cell_list::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.cell_list {
  height: 100%;
  overflow-y: scroll;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.table_content {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.tools_bar {
  width: 100%;
  height: 44px;
  background-color: #f3f3f3;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: flex-end;
  padding: 0 15px;
}

.content_view {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tools_wrap {
  width: 21cm;
  display: flex;
  justify-content: flex-end;
  padding: 10px 0;
}

.cell {
  display: flex;
  flex-direction: column;
  padding: 5px 15px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.cell_row {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.cell_row span {
  margin-left: 5px;
  font-size: 14px;
  color: #333;
}

.cell_row__item {
  color: #333;
  font-size: 15px;
  width: 105px;
}

.cell_row__item span {
  margin-left: 5px;
}

.selected-action {
  background-color: #eef2f9;
}

.table_wrap {
  width: 21cm;
  height: 14cm;
  background-color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.table_title {
  font-weight: bold;
  font-size: 20px;
}

.table_title__subordinate {
  position: absolute;
  top: 0;
  right: 10px;
  width: 112px;
  line-height: 18px;
  margin-top: 15px;
  color: #ff4220;
  font-size: 15px;
  font-weight: normal;
}

.table_wrap .spec_title {
  color: #333;
  margin-right: 10px;
}

.table_wrap .spec_info {
  font-size: 14px;
  color: cornflowerblue;
}

.table_wrap .person {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}

.vertical_align {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.demo-drawer__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-bottom: 30px;
}
.demo-drawer__footer {
  display: flex;
  justify-content: space-around;
}
</style>
