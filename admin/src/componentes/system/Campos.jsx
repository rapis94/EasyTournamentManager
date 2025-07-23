import { useState, useRef } from "react";

export function CampoGroup({ label = "", children, ...props }) {
  return <div style={{borderStyle: "solid", borderColor: "rgba(200, 200, 200, 0.5)", padding: "10px", borderRadius: "10px"}} {...props}>
    <label style={{ background: "white", color: "gray", padding: "0px 10px"}}>{label}</label>
    {children}
  </div>
}

export function FloatInput({
  label = "Nombre",
  value,
  onChange,
  type = "text",
  name,
  required = false,
  autoComplete = "off",
  ...props
}) {
  const [focused, setFocused] = useState(false);

  const isFloating = focused || (value !== "" && value !== null && value !== undefined);

  return (
    <div className="form-group position-relative">
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="form-control pt-4 pb-1 h-100"
        autoComplete={autoComplete}
        required={required}

        {...props}
      />
      <label
        className={`position-absolute px-2 bg-white transition-all ${isFloating ? " text-primary small" : " small text-muted"
          }`}
        style={{
          left: "5px",
          top: "1px",
          pointerEvents: "none",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {label + (required ? "*" : "")}
      </label>
    </div>
  );
}

export function InputGroup({
  icon = null,
  iconPosition = "start", // o "end"
  label = "",
  value,
  onChange,
  type = "text",
  name,
  required = false,
  autoComplete = "off",
  className = "",
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || String(value || "").length > 0;
  return (
    <div className={`form-group position-relative mb-3 ${className}`}>
      {icon && iconPosition === "start" && (
        <span
          className="position-absolute top-50 translate-middle-y text-muted"
          style={{ left: "12px", pointerEvents: "none" }}
        >
          {icon}
        </span>
      )}

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={autoComplete}
        required={required}
        className={`form-control ${iconPosition === "start" ? "ps-5" : ""}
                                   ${iconPosition === "end" ? "pe-5" : ""} pt-4 pb-1`}
        {...props}
      />

      {label && (
        <label
          className={`position-absolute px-2 bg-white transition-all ${isFloating ? "text-primary small" : "translate-middle-y text-muted"
            }`}
          htmlFor={name}
          style={{
            left: icon && iconPosition === "start" ? "40px" : "12px",
            top: "12px",
            pointerEvents: "none",
            transition: "all 0.2s ease-in-out",
          }}
        >
          {label + (required ? "*" : "")}
        </label>
      )}

      {icon && iconPosition === "end" && (
        <span
          className="position-absolute top-50 translate-middle-y text-muted"
          style={{ right: "12px", pointerEvents: "none" }}
        >
          {icon}
        </span>
      )}
    </div>
  );
}

export function FloatSelect({
  label = "Seleccione una opción",
  value,
  onChange,
  name,
  required = false,
  autoComplete = "off",
  children,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || (value !== "" && value !== null && value !== undefined);

  return (
    <div className="form-group position-relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="form-control pt-4 pb-1 h-100"
        autoComplete={autoComplete}
        required={required}
        {...props}
      >
        {children}
      </select>
      <label
        className={`position-absolute px-2 bg-white transition-all ${isFloating ? "text-primary small" : "small text-muted"
          }`}
        style={{
          left: "5px",
          top: "1px",
          pointerEvents: "none",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {label + (required ? "*" : "")}
      </label>
    </div>
  );
}

export function FloatTextarea({
  label = "Texto",
  value,
  onChange,
  name,
  required = false,
  autoComplete = "off",
  rows = 3,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  const isFloating = focused || (value !== "" && value !== null && value !== undefined);

  return (
    <div className="form-group position-relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="form-control pt-4 pb-1 h-100"
        autoComplete={autoComplete}
        required={required}
        rows={rows}
        {...props}
      />
      <label
        className={`position-absolute px-2 bg-white transition-all top-0 ${isFloating ? " text-primary small" : " small text-muted"
          }`}
        style={{
          left: "5px",
          pointerEvents: "none",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {label + (required ? "*" : "")}
      </label>
    </div>
  );
}

export function FloatFileInput({
  label = "Seleccionar archivo",
  value,
  name,
  required = false,
  accept = "*/*",
  clase = "btn-primary",
  previous = false,
  onChange = ()=>{},
  ...props
}) {
  const inputRef = useRef(null);


  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };



  return (
    <div className="form-group position-relative">
      <input
        ref={inputRef}
        name={name}
        type="file"
        style={{ display: "none" }}
        onChange={onChange}
        
        accept={accept}
        required={required}
        {...props}
      />
      <button
        type="button"
        className={"btn " + clase + " w-100 pt-4 pb-1"}
        onClick={handleButtonClick}
      >
        {value && value.name ? value.name : label + (required ? "*" : "")}
      </button>

    </div>
  );
}
