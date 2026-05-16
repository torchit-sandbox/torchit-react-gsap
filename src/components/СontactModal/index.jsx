import {useState, useCallback, useEffect, useRef} from "react";
import {useForm, Controller} from "react-hook-form";
import '../../styles/scss/style.scss'
import {Progressbar} from "../UI";
import {MODAL_FORM} from "../../data";

// ─── Data ────────────────────────────────────────────────────────────────────
const BUILD_OPTIONS = [
  "Website",
  "Mobile app",
  "Backend",
  "Infrastructure",
  "Security audit",
  "Other",
];

const TIMING_OPTIONS = ["1", "2", "3", "4"];
const BUDGET_OPTIONS = ["Under $10k", "$10k–$25k", "$25k–$50k", "Not sure yet"];

const TOTAL_STEPS = 4;
const STEP_TITLES = [
  {
    title: "Let`s connect!",
    subtitle: "Fill in a small form and we`ll contact you back soon."
  },
  {title: "What can we help you build?", subtitle: "Choose up to two options."},
  {title: "Timeline & budget", subtitle: null},
  {title: "Tell us a bit about you", subtitle: null},
];

// ─── Steps ───────────────────────────────────────────────────────────────────
function StepEmail({register, errors}) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor="contact-email">Email</label>
      <input
        id="contact-email"
        className={`form-input ${errors.email ? "error" : ""}`}
        placeholder="your_email@gmail.com"
        autoComplete="email"
        aria-invalid={errors.email ? 'true' : 'false'}
        aria-describedby={errors.email ? 'contact-email-error' : undefined}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email"
          },
        })}
      />
      {errors.email && <p className="form-error" id="contact-email-error">{errors.email.message}</p>}
    </div>
  );
}

function StepBuild({control, watch}) {
  const selected = watch("buildOptions") || [];

  return (
    <Controller
      name="buildOptions"
      control={control}
      defaultValue={[]}
      rules={{validate: (v) => (v && v.length > 0) || "Pick at least one option"}}
      render={({field, fieldState}) => (
        <>
          <div className="chips" role="group" aria-label="Build options">
            {BUILD_OPTIONS.map((opt) => {
              const isSelected = (field.value || []).includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  className={`chip ${isSelected ? "selected" : ""}`}
                  aria-pressed={isSelected}
                  onClick={() => {
                    const cur = field.value || [];
                    if (isSelected) {
                      field.onChange(cur.filter((o) => o !== opt));
                    } else if (cur.length < 2) {
                      field.onChange([...cur, opt]);
                    }
                  }}
                >
                  {opt}
                  {isSelected && <span className="chip__remove" aria-hidden="true">×</span>}
                </button>
              );
            })}
          </div>
          {fieldState.error &&
            <p className="form-error">{fieldState.error.message}</p>}
          {selected.includes("Other") && (
            <Controller
              name="customOption"
              control={control}
              defaultValue=""
              render={({field: cf}) => (
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-custom-option">Your option</label>
                  <input
                    id="contact-custom-option"
                    className="form-input"
                    placeholder="Another option here"
                    {...cf}
                  />
                </div>
              )}
            />
          )}
        </>
      )}
    />
  );
}

function RadioOption({label, selected, onClick}) {
  return (
    <button
      type="button"
      className={`radio-option ${selected ? "selected" : ""}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="radio-circle" aria-hidden="true" />
      {label}
    </button>
  );
}

function StepTimeline({control}) {
  return (
    <>
      <div className="radio-header" aria-hidden="true">
        <span>Timing options:</span>
        <span>Budget ranges:</span>
      </div>
      <div className="radio-columns">
        <Controller
          name="timing"
          control={control}
          defaultValue=""
          rules={{required: true}}
          render={({field}) => (
            <div className="radio-columns__left" role="group" aria-label="Timing options">
              {TIMING_OPTIONS.map((opt) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={field.value === opt}
                  onClick={() => field.onChange(opt)}
                />
              ))}
            </div>
          )}
        />
        <Controller
          name="budget"
          control={control}
          defaultValue=""
          rules={{required: true}}
          render={({field}) => (
            <div className="radio-columns__right" role="group" aria-label="Budget ranges">
              {BUDGET_OPTIONS.map((opt) => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={field.value === opt}
                  onClick={() => field.onChange(opt)}
                />
              ))}
            </div>
          )}
        />
      </div>
    </>
  );
}

function StepAbout({register}) {
  return (
    <>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-company">
          Company name <span>Optional</span>
        </label>
        <input
          id="contact-company"
          className="form-input"
          placeholder="Write your option here"
          autoComplete="organization"
          {...register("company")}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-notes">
          Anything else to share? <span>Optional</span>
        </label>
        <textarea
          id="contact-notes"
          className="form-textarea"
          placeholder="Write anything you want us to know..."
          rows={5}
          {...register("notes")}
        />
      </div>
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ContactModal({onClose, onSubmit}) {
  const [step, setStep] = useState(1);
  const [animKey, setAnimKey] = useState(0);
  const modalRef = useRef(null);
  const previouslyFocusedRef = useRef(null);

  const {
    register,
    control,
    watch,
    trigger,
    handleSubmit,
    formState: {errors},
  } = useForm({mode: "onChange"});

  const timing = watch("timing");
  const budget = watch("budget");
  const buildOptions = watch("buildOptions") || [];
  const email = watch("email");

  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement;
    document.documentElement.classList.add('is-lock');

    const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusFirst = () => {
      const focusable = modalRef.current?.querySelectorAll(focusableSelector);
      focusable?.[0]?.focus();
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;

      const focusable = Array.from(modalRef.current.querySelectorAll(focusableSelector));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.setTimeout(focusFirst, 0);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.documentElement.classList.remove('is-lock');
      previouslyFocusedRef.current?.focus?.();
    };
  }, [onClose]);

  const canContinue = useCallback(() => {
    if (step === 1) return !!email && !errors.email;
    if (step === 2) return buildOptions.length > 0;
    if (step === 3) return !!timing && !!budget;
    return true;
  }, [step, email, errors.email, buildOptions, timing, budget]);

  const goNext = async () => {
    let valid = true;
    if (step === 1) valid = await trigger("email");
    if (step === 2) valid = await trigger("buildOptions");
    if (!valid) return;
    setStep((s) => s + 1);
    setAnimKey((k) => k + 1);
  };

  const goBack = () => {
    setStep((s) => s - 1);
    setAnimKey((k) => k + 1);
  };

  const {title, subtitle} = STEP_TITLES[step - 1];

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-describedby={subtitle ? 'contact-modal-subtitle' : undefined}
      >
        {/* Left image */}
        <img
          className="modal__image"
          src={MODAL_FORM}
          alt=""
          aria-hidden="true"
        />

        {/* Close */}
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close contact form"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M11.9998 13.4L7.0998 18.3C6.91647 18.4834 6.68314 18.575 6.3998 18.575C6.11647 18.575 5.88314 18.4834 5.6998 18.3C5.51647 18.1167 5.4248 17.8834 5.4248 17.6C5.4248 17.3167 5.51647 17.0834 5.6998 16.9L10.5998 12L5.6998 7.10005C5.51647 6.91672 5.4248 6.68338 5.4248 6.40005C5.4248 6.11672 5.51647 5.88338 5.6998 5.70005C5.88314 5.51672 6.11647 5.42505 6.3998 5.42505C6.68314 5.42505 6.91647 5.51672 7.0998 5.70005L11.9998 10.6L16.8998 5.70005C17.0831 5.51672 17.3165 5.42505 17.5998 5.42505C17.8831 5.42505 18.1165 5.51672 18.2998 5.70005C18.4831 5.88338 18.5748 6.11672 18.5748 6.40005C18.5748 6.68338 18.4831 6.91672 18.2998 7.10005L13.3998 12L18.2998 16.9C18.4831 17.0834 18.5748 17.3167 18.5748 17.6C18.5748 17.8834 18.4831 18.1167 18.2998 18.3C18.1165 18.4834 17.8831 18.575 17.5998 18.575C17.3165 18.575 17.0831 18.4834 16.8998 18.3L11.9998 13.4Z"
              fill="white"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="modal__content">
          <div className="modal__info">
            <h3 className="modal__title" id="contact-modal-title">{title}</h3>
            {subtitle && <p className="modal__subtitle" id="contact-modal-subtitle">{subtitle}</p>}
          </div>
          <form
            key={animKey}
            className="step-enter"
            onSubmit={handleSubmit((data) => {
              onSubmit?.(data);
              onClose?.();
            })}
          >
            {step === 1 && <StepEmail
              register={register}
              errors={errors}
            />}
            {step === 2 && <StepBuild
              control={control}
              watch={watch}
            />}
            {step === 3 && <StepTimeline control={control} />}
            {step === 4 && <StepAbout register={register} />}
            <div className="modal__actions">
              {step > 1 && (
                <button
                  type="button"
                  className="button button--white"
                  onClick={goBack}
                >
                  Back
                </button>
              )}

              {step < TOTAL_STEPS ? (
                <button
                  type="button"
                  className="button button--yellow"
                  disabled={!canContinue()}
                  onClick={goNext}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className="button button--yellow"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>

        <Progressbar value={(step / TOTAL_STEPS) * 100} />
      </div>
    </div>
  );
}