const { test } = require("node:test");
const assert = require("node:assert/strict");
const { isWorkingTime, workingHours } = require("../middlewares/workingHours");

// Dates construites en heure locale : 17/11/2025 est un lundi
const at = (day, hour, minute = 0) => new Date(2025, 10, day, hour, minute);

test("ouvert un jour de semaine pendant les heures de travail", () => {
  assert.equal(isWorkingTime(at(17, 9)), true); // lundi 9h00
  assert.equal(isWorkingTime(at(19, 12, 30)), true); // mercredi 12h30
  assert.equal(isWorkingTime(at(21, 16, 59)), true); // vendredi 16h59
});

test("fermé avant 9h et à partir de 17h", () => {
  assert.equal(isWorkingTime(at(17, 8, 59)), false); // lundi 8h59
  assert.equal(isWorkingTime(at(17, 17)), false); // lundi 17h00
});

test("fermé le week-end", () => {
  assert.equal(isWorkingTime(at(22, 10)), false); // samedi
  assert.equal(isWorkingTime(at(23, 10)), false); // dimanche
});

test("le middleware appelle next() pendant les heures d'ouverture", () => {
  let nextCalled = false;
  const res = { render: () => assert.fail("render ne doit pas être appelé") };

  workingHours(() => at(18, 10))({}, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
});

test("le middleware affiche la page « closed » hors des heures d'ouverture", () => {
  let renderedView;
  const res = { render: (view) => { renderedView = view; } };

  workingHours(() => at(22, 10))({}, res, () => assert.fail("next ne doit pas être appelé"));

  assert.equal(renderedView, "closed");
});
