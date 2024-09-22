var exSkillAffection;
var item1Affection;
var item2Affection;
var nowAffection;
var expectedAffectionNum;

const season1LiveList = new Array();
const season2LiveList = new Array();
const season3LiveList = new Array();
const season4LiveList = new Array();

class AddAffection {
  constructor(value, description, remainWeek) {
    this.value = value;
    this.description = `(+${value}) ${description} ${
      remainWeek ? `(남은 주 : ${remainWeek})` : ""
    }`;
  }
}

function createSeasonLiveList() {
  // 시즌 1
  season1LiveList.push(new AddAffection(5, "엔트리 라이브 (エントリーライブ)", undefined));
  season1LiveList.push(new AddAffection(4, "시즌1 목표 달성", undefined));

  // 시즌 2
  season2LiveList.push(new AddAffection(1, "Rhythmic Diva", 1));
  season2LiveList.push(new AddAffection(6, "시즌2 목표 달성", undefined));

  // 시즌 3
  season3LiveList.push(new AddAffection(1, "스마일 아레나 (スマイルアリーナ)", 9));
  season3LiveList.push(new AddAffection(1, "Dreaming My Way", 6));
  season3LiveList.push(new AddAffection(1, "TOP VOCALIST", 2));
  season3LiveList.push(new AddAffection(1, "TOP DANCER", 2));
  season3LiveList.push(new AddAffection(1, "TOP EXPRESSER", 2));
  season3LiveList.push(new AddAffection(1, "러브레터의 Answer── (ラブレターのAnswer──)", 1));
  season3LiveList.push(new AddAffection(7, "시즌3 목표 달성", undefined));

  // 시즌 4
  season4LiveList.push(new AddAffection(1, "몇 번이라도 부르자 (なんどでも唄おう)", 16));
  season4LiveList.push(new AddAffection(1, "톱스타는 1곡만 (トップスターは1曲だけ)", 15));
  season4LiveList.push(new AddAffection(1, "유성 스타랭킹 (流星スターランキング)", 10));
  season4LiveList.push(new AddAffection(1, "일곱 빛깔 가합전 (なないろ歌合戦)", 8));
  season4LiveList.push(new AddAffection(1, "주간 프리즘 멜로디즈 (週刊プリズムメロディーズ)", 2));
  season4LiveList.push(new AddAffection(1, "TOP SONGS", 1));
  season4LiveList.push(new AddAffection(10, "시즌4 목표 달성", undefined));
  season4LiveList.push(new AddAffection(10, "엑시비션 매치 (エキシビションマッチ)", undefined));
}

// 프로듀스 준비
$("#prepareProduceAffectionSummary").bind("click", function () {
  if (prepareProduceAffectionDetails.open) {
    $("#prepareProduceAffectionSummary").text("프로듀스 준비 (펼치기)");
  } else {
    $("#prepareProduceAffectionSummary").text("프로듀스 준비 (접기)");
  }
});

// 프로듀스 중
$("#ProducingAffectionSummary").bind("click", function () {
  if (ProducingAffectionDetails.open) {
    $("#ProducingAffectionSummary").text("프로듀스 중 (펼치기)");
  } else {
    $("#ProducingAffectionSummary").text("프로듀스 중 (접기)");
  }
});

$().ready(function () {
  init();
});

function init() {
  prepareAffectionNum = 0;
  nowAffectionNum = 0;
  expectedAffectionNum = 0;
  liveAffectionNum = 0;

  // 프로듀스 준비
  if (prepareProduceAffectionDetails.open) {
    $("#prepareProduceAffectionSummary").text("프로듀스 준비 (접기)");
  } else {
    $("#prepareProduceAffectionSummary").text("프로듀스 준비 (펼치기)");
  }

  // 프로듀스 중
  if (ProducingAffectionDetails.open) {
    $("#ProducingAffectionSummary").text("프로듀스 중 (접기)");
  } else {
    $("#ProducingAffectionSummary").text("프로듀스 중 (펼치기)");
  }

  mainInputUpdate();
  createSeasonLiveList();
  createLiveCheckbox();
}

function createLiveCheckbox() {
  $("#seasonAffection").empty();

  // 시즌 1
  $("#seasonAffection").append("<h4>시즌 1</h4>");
  season1LiveList.forEach((data, id) => {
    $("#seasonAffection")
      .append(
        $("<input>", {
          type: "checkbox",
          id: `affection_1_${id}`,
          name: "liveAffection",
          value: data.value,
          onchange: "mainInputUpdate()",
        })
      )
      .append(
        $("<label>", {
          for: `affection_1_${id}`,
          text: ` ${data.description}`,
        }).append("<br />")
      );
  });

  // 시즌 2
  $("#seasonAffection").append("<h4>시즌 2</h4>");
  season2LiveList.forEach((data, id) => {
    $("#seasonAffection")
      .append(
        $("<input>", {
          type: "checkbox",
          id: `affection_2_${id}`,
          name: "liveAffection",
          value: data.value,
          onchange: "mainInputUpdate()",
        })
      )
      .append(
        $("<label>", {
          for: `affection_2_${id}`,
          text: ` ${data.description}`,
        }).append("<br />")
      );
  });

  // 시즌 3
  $("#seasonAffection").append("<h4>시즌 3</h4>");
  season3LiveList.forEach((data, id) => {
    $("#seasonAffection")
      .append(
        $("<input>", {
          type: "checkbox",
          id: `affection_3_${id}`,
          name: "liveAffection",
          value: data.value,
          onchange: "mainInputUpdate()",
        })
      )
      .append(
        $("<label>", {
          for: `affection_3_${id}`,
          text: ` ${data.description}`,
        }).append("<br />")
      );
  });

  // 시즌 3
  $("#seasonAffection").append("<h4>시즌 4</h4>");
  season4LiveList.forEach((data, id) => {
    $("#seasonAffection")
      .append(
        $("<input>", {
          type: "checkbox",
          id: `affection_4_${id}`,
          name: "liveAffection",
          value: data.value,
          onchange: "mainInputUpdate()",
        })
      )
      .append(
        $("<label>", {
          for: `affection_4_${id}`,
          text: ` ${data.description}`,
        }).append("<br />")
      );
  });
}

function mainInputUpdate() {
  initNumVal();

  applyCalculatedAffectionNum();
}

function initNumVal() {
  exSkillAffection = setInitAffectionNum("#exSkillAffection");
  item1Affection = setInitAffectionNum("#item1Affection");
  item2Affection = setInitAffectionNum("#item2Affection");
  nowAffection = setInitAffectionNum("#nowAffection");
  expectedAffectionNum = setInitAffectionNum("#expectedAffectionNum");
}

function setInitAffectionNum(id) {
  value = chkNumRange($(id).val(), $(id).attr("min"), $(id).attr("max"));
  $(id).val(value);

  return value;
}

function chkNumRange(value, minVal = 0, maxVal = 100) {
  const min = minVal ? Number(minVal) : 0;
  const max = maxVal ? Number(maxVal) : 100;

  var num;
  var target;
  // 입력 데이터가 숫자가 아닐시 최소값으로 변경
  if (isNaN(value)) {
    num = min;
    target = min;
  } else {
    num = value ? Number(value) : 0;
    target = value ? Number(value) : 0;
  }

  if (target < min) {
    num = min;
  }

  if (target > max) {
    num = max;
  }

  return num;
}

function applyCalculatedAffectionNum() {
  const prepareAffection = chkNumRange(exSkillAffection + item1Affection + item2Affection);

  $("#prepareAffectionResult").text(prepareAffection);

  const finalAffectionResult = chkNumRange(
    nowAffection + expectedAffectionNum + totalLiveAffection()
  );
  $("#finalAffectionResult").text(finalAffectionResult);

  $("#displayAffectionResult").text(displayAffection(finalAffectionResult));
}

function totalLiveAffection() {
  var totalLiveAffectionNum = 0;
  var addFansBonus = $(`input[name="liveAffection"]`);

  for (var i = 0; i < addFansBonus.length; i++) {
    if (addFansBonus.eq(i).is(":checked") == true) {
      totalLiveAffectionNum += Number(addFansBonus.eq(i).val());
    }
  }

  return totalLiveAffectionNum;
}

/**
 * 친애도 표시
 */
function displayAffection(affectionNum) {
  var affectionLvValList = [1, 25, 50, 75, 100];
  var affectionDetailLv;
  var affectionDetailNext;
  var affectionDetailStr;

  if (affectionNum >= 100) {
    affectionDetailStr = "Lv : Max";
  } else {
    for (var i = affectionLvValList.length - 1; i >= 0; i--) {
      if (affectionNum < affectionLvValList[i]) {
        affectionDetailLv = i;
        affectionDetailNext = affectionLvValList[affectionDetailLv] - affectionNum;
        affectionDetailStr = "Lv : " + affectionDetailLv + ", Next : " + affectionDetailNext;
      }
    }
  }

  return affectionDetailStr;
}
