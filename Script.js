const ADDED_EX_INPUT_LIMIT = 3;
const ADDED_ITEM_INPUT_LIMIT = 2;
const ADDED_EXPECTED_INPUT_LIMIT = 10;

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

  createSeasonLiveList();
  createLiveCheckbox();
  mainInputUpdate();
}

/**
 * EX스킬 입력란 추가 / 삭제
 */
$("#addExSkillInput").click(function () {
  $("#exSkillInputDiv").append(`
    <div class="addedExSkillAffection">
    <input
      type="number"
      name="exSkillAffection"
      min="0"
      max="100"
      value="0"
      step="1"
      onchange="mainInputUpdate()"
    />
    <button class="removeAddedExSkillInput">삭제</button>

    </div>
`);

  const count = $(`input[name="exSkillAffection"]`).length;
  switchButtonDisable("addExSkillInput", count >= ADDED_EX_INPUT_LIMIT);

  $(`.removeAddedExSkillInput`).click(function () {
    $(this).parent(".addedExSkillAffection").remove();
    mainInputUpdate();

    const count = $(`input[name="exSkillAffection"]`).length;
    switchButtonDisable("addExSkillInput", count >= ADDED_EX_INPUT_LIMIT);
  });
});

/**
 * 아이템 입력란 추가 / 삭제
 */
$("#addItemInput").click(function () {
  $("#itemInputDiv").append(`
    <div class="addedItemAffection">
    <input
      type="number"
      name="itemAffection"
      min="0"
      max="100"
      value="0"
      step="1"
      onchange="mainInputUpdate()"
    />
    <button class="removeAddedItemInput">삭제</button>

    </div>
`);

  const count = $(`input[name="itemAffection"]`).length;
  switchButtonDisable("addItemInput", count >= ADDED_ITEM_INPUT_LIMIT);

  $(`.removeAddedItemInput`).click(function () {
    $(this).parent(".addedItemAffection").remove();
    mainInputUpdate();

    const count = $(`input[name="itemAffection"]`).length;
    switchButtonDisable("addItemInput", count >= ADDED_ITEM_INPUT_LIMIT);
  });
});

/**
 * 취득 예정 친애도 추가 / 삭제
 */
$("#addExpectedInput").click(function () {
  $("#expectedInputDiv").append(`
    <div class="addedExpectedAffection">
    <input
      type="number"
      name="expectedAffection"
      min="0"
      max="100"
      value="0"
      step="1"
      onchange="mainInputUpdate()"
    />
    <button class="removeAddedExpectedInput">삭제</button>

    </div>
`);

  const count = $(`input[name="expectedAffection"]`).length;
  switchButtonDisable("addExpectedInput", count >= ADDED_EXPECTED_INPUT_LIMIT);

  $(`.removeAddedExpectedInput`).click(function () {
    $(this).parent(".addedExpectedAffection").remove();
    mainInputUpdate();

    const count = $(`input[name="expectedAffection"]`).length;
    switchButtonDisable("addExpectedInput", count >= ADDED_EXPECTED_INPUT_LIMIT);
  });
});

function switchButtonDisable(id, condition) {
  if (condition) {
    $(`#${id}`).attr("disabled", true);
  } else {
    $(`#${id}`).attr("disabled", false);
  }
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
  exSkillAffection = setInitAffectionNumByName("exSkillAffection");
  itemAffection = setInitAffectionNumByName("itemAffection");
  nowAffection = setInitAffectionNumByName("nowAffection");
  expectedAffectionNum = setInitAffectionNumByName("expectedAffection");
}

function setInitAffectionNumById(id) {
  value = chkNumRange($(id).val(), $(id).attr("min"), $(id).attr("max"));
  $(id).val(value);

  return value;
}

function setInitAffectionNumByName(name) {
  let totalValue = 0;
  const inputFields = $(`input[name="${name}"]`);

  for (let i = 0; i < inputFields.length; i++) {
    inputFields
      .eq(i)
      .val(
        chkNumRange(
          inputFields.eq(i).val(),
          inputFields.eq(i).attr("min"),
          inputFields.eq(i).attr("max")
        )
      );
    totalValue += Number(inputFields.eq(i).val());
  }

  return totalValue;
}

function chkNumRange(value, minVal = 0, maxVal = 100) {
  const min = minVal ? Number(minVal) : 0;
  const max = maxVal ? Number(maxVal) : 100;

  let num;
  let target;
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
  const prepareAffection = chkNumRange(exSkillAffection + itemAffection);

  $("#prepareAffectionResult").text(prepareAffection);

  $("#displayPrepareAffectionResult").text(displayAffection(prepareAffection));

  $("#nowAffectionResult").text(`현재 친애도 (${displayAffection(nowAffection)})`);

  const finalAffectionResult = chkNumRange(
    nowAffection + expectedAffectionNum + totalLiveAffection()
  );
  $("#finalAffectionResult").text(finalAffectionResult);

  $("#displayFinalAffectionResult").text(displayAffection(finalAffectionResult));
}

function totalLiveAffection() {
  let totalLiveAffectionNum = 0;
  const inputFields = $(`input[name="liveAffection"]`);

  for (let i = 0; i < inputFields.length; i++) {
    if (inputFields.eq(i).is(":checked") == true) {
      totalLiveAffectionNum += Number(inputFields.eq(i).val());
    }
  }

  return totalLiveAffectionNum;
}

/**
 * 친애도 표시
 */
function displayAffection(affectionNum) {
  let affectionLvValList = [1, 25, 50, 75, 100];
  let affectionDetailLv;
  let affectionDetailNext;
  let affectionDetailStr;

  if (affectionNum >= 100) {
    affectionDetailStr = "Lv : Max";
  } else {
    for (let i = affectionLvValList.length - 1; i >= 0; i--) {
      if (affectionNum < affectionLvValList[i]) {
        affectionDetailLv = i;
        affectionDetailNext = affectionLvValList[affectionDetailLv] - affectionNum;
        affectionDetailStr = "Lv : " + affectionDetailLv + ", Next : " + affectionDetailNext;
      }
    }
  }

  return affectionDetailStr;
}
