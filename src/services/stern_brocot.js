const do_result = (bas6, moqam) => {
  return { bas6, moqam };
};
const fraction_error = (bas6, moqam, val) => {
  return Math.abs(moqam * val - bas6);
};
export const stern_brocot = (x, error) => {
  let n;
  let lower_n = 0;
  let lower_d = 1;
  let upper_n = 1;
  let upper_d = 1;
  let middle_n;
  let middle_d;
  if (!x) return do_result(0, 1);
  n = Math.floor(x);
  x = x - n;
  if (x < error) return do_result(n, 1);
  if (1 - error < x) return do_result(n + 1, 1);
  lower_n = 0;
  lower_d = 1;
  upper_n = 1;
  upper_d = 1;
  while (true) {
    middle_n = lower_n + upper_n;
    middle_d = lower_d + upper_d;
    if (middle_d * (x + error) < middle_n) {
      upper_n = middle_n;
      upper_d = middle_d;
    } else if (middle_n < (x - error) * middle_d) {
      lower_n = middle_n;
      lower_d = middle_d;
    } else return do_result(n * middle_d + middle_n, middle_d);
  }
};
export const auto_stern_brocot = (x) => {
  let error = 0.1;
  if (!x) return do_result(0, 1);

  let result = stern_brocot(x, error);

  while (
    fraction_error(result.bas6, result.moqam, x) * 100 > 3 &&
    error !== 0.0
  ) {
    error = error / 10.0;
    result = stern_brocot(x, error);
  }

  if (result.bas6 > 0) return result;

  //   min_result = do_result(result.bas6,result. moqam);

  error = 0.001;

  let min_result = stern_brocot(x, error);
  let min_error = fraction_error(min_result.min_bas6, min_result.min_moqam, x);

  for (let i = 0; i < 2; i++) {
    error = error / 10.0;
    let t_result = stern_brocot(x, error);
    let t_error = fraction_error(t_result.t_bas6, t_result.t_moqam, x);

    if (t_result.t_moqam < 100) {
      if (t_error < min_error)
        min_result = do_result(t_result.t_bas6, t_result.t_moqam);
    }
  }

  result = do_result(min_result.min_bas6, min_result.min_moqam);

  min_error = fraction_error(min_result.min_bas6, min_result.min_moqam, x);

  if (min_error < 0.05) return result;

  return stern_brocot(x, 0.0001);
};
