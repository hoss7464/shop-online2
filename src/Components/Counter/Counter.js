import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  dicrement,
  incrementByAmount,
  resetAmount,
} from "../../Redux/actions/counterSlice";
import {
  clickToggle,
  hoverEnableToggle,
  hoverDisableToggle,
} from "../../Redux/actions/toggleSlice";
import { updateForm, submitForm } from "../../Redux/actions/simpleFormSlice";

//------------------------------------------------------------------------------

const Counter = () => {
  //Selectors for counters :
  const count1 = useSelector(
    (state) => state.counter.counters["counter1"] || 0
  );
  const count2 = useSelector(
    (state) => state.counter.counters["counter2"] || 0
  );

  //-----------------------------------------------------------------------------
  //Selectors for toggle click :
  const toggles = useSelector((state) => state.toggle.toggles);
  //-----------------------------------------------------------------------------
  //Selectors for forms :
  const forms = useSelector((state) => state.simpleForm.forms);


  //-----------------------------------------------------------------------------
  const dispatch = useDispatch();
  //-----------------------------------------------------------------------------
  //Functions form hover :
  const HoverMouseEnter = (id) => {
    dispatch(hoverEnableToggle(id));
  };

  const HoverMouseLeave = (id) => {
    dispatch(hoverDisableToggle(id));
  };

  //-------------------------------------------------------------------------------
  //Functions form forms :
  const handleChange = (formId, e) => {
    const { name, value } = e.target;
    dispatch(updateForm({ formId, field: name, value }));
  };

  const handleSubmit = (formId, e) => {
    e.preventDefault();
    dispatch(submitForm({ formId, formData: forms[formId] }));
  };
  //-------------------------------------------------------------------------------
  


  return (
    <>
      <div>
        <p>This is my counter : {count1} </p>
        <button onClick={() => dispatch(increment("counter1"))}>
          increment
        </button>
        <button onClick={() => dispatch(dicrement("counter1"))}>
          dicrement
        </button>
        <button
          onClick={() =>
            dispatch(incrementByAmount({ id: "counter1", amount: 5 }))
          }
        >
          increment by 5
        </button>
        <button onClick={() => dispatch(resetAmount("counter1"))}>reset</button>
      </div>

      <div>
        <p>This is my counter : {count2} </p>
        <button onClick={() => dispatch(increment("counter2"))}>
          increment
        </button>
        <button onClick={() => dispatch(dicrement("counter2"))}>
          dicrement
        </button>
        <button
          onClick={() =>
            dispatch(incrementByAmount({ id: "counter2", amount: 10 }))
          }
        >
          increment by 10
        </button>
        <button onClick={() => dispatch(resetAmount("counter2"))}>reset</button>
      </div>

      <div>
        <h1>Toggle function :</h1>
        <button onClick={() => dispatch(clickToggle("toggle1"))}>Click</button>
        <p>
          {toggles["toggle1"]
            ? "Toggle function executed"
            : "Hello Hossein are you ready?"}
        </p>
      </div>

      <div>
        <h1>Toggle function :</h1>
        <button onClick={() => dispatch(clickToggle("toggle2"))}>Click</button>
        <p>
          {toggles["toggle2"]
            ? "Toggle function executed"
            : "Hello Hossein are you ready?"}
        </p>
      </div>

      <div>
        <h1>Toggle function :</h1>
        <button
          onMouseEnter={() => HoverMouseEnter("toggle3")}
          onMouseLeave={() => HoverMouseLeave("toggle3")}
        >
          Hover
        </button>
        <p>
          {toggles["toggle3"]
            ? "Toggle function executed"
            : "Hello Hossein are you ready?"}
        </p>
      </div>

      <div>
        <h1>Toggle function :</h1>
        <button
          onMouseEnter={() => HoverMouseEnter("toggle4")}
          onMouseLeave={() => HoverMouseLeave("toggle4")}
        >
          Hover
        </button>
        <p>
          {toggles["toggle4"]
            ? "Toggle function executed"
            : "Hello Hossein are you ready?"}
        </p>
      </div>

      <form onSubmit={(e) => handleSubmit("form1", e)}>
        <h1>Simple Form</h1>
        <div>
          <label>name :</label>
          <input
            placeholder="name"
            type="text"
            name="name"
            value={forms["form1"].name}
            onChange={(e) => handleChange("form1", e)}
          />
        </div>
        <div>
          <label>email : </label>
          <input
            placeholder="email"
            type="email"
            name="email"
            value={forms["form1"].email}
            onChange={(e) => handleChange("form1", e)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={(e) => handleSubmit("form2", e)}>
        <h1>Simple Form</h1>
        <div>
          <label>username :</label>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={forms["form2"].username}
            onChange={(e) => handleChange("form2", e)}
          />
        </div>
        <div>
          <label>password : </label>
          <input
            placeholder="password"
            type="password"
            name="password"
            value={forms["form2"].password}
            onChange={(e) => handleChange("form2", e)}
          />
        </div>

        <div>
          <label>confirm password: </label>
          <input
            placeholder="confirmPassword"
            type="password"
            name="confirmPassword"
            value={forms["form2"].confirmPassword}
            onChange={(e) => handleChange("form2", e)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={(e) => handleSubmit("loginForm", e)}>
        <h1>Log in Form</h1>
        <div>
          <label>email :</label>
          <input
            placeholder="email"
            type="email"
            name="email"
            value={forms["loginForm"].email}
            onChange={(e) => handleChange("loginForm", e)}
          />
        </div>
        <div>
          <label>password : </label>
          <input
            placeholder="password"
            type="password"
            name="password"
            value={forms["loginForm"].password}
            onChange={(e) => handleChange("loginForm", e)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <form onSubmit={(e) => handleSubmit("signupForm", e)}>
        <h1>Signup Form</h1>
        <div>
          <label>fullname :</label>
          <input
            placeholder="fullname"
            type="text"
            name="fullname"
            value={forms["signupForm"].fullname}
            onChange={(e) => handleChange("signupForm", e)}
          />
        </div>
        <div>
          <label>username :</label>
          <input
            placeholder="username"
            type="text"
            name="username"
            value={forms["signupForm"].username}
            onChange={(e) => handleChange("signupForm", e)}
          />
        </div>

        <div>
          <label>email :</label>
          <input
            placeholder="email"
            type="email"
            name="email"
            value={forms["signupForm"].email}
            onChange={(e) => handleChange("signupForm", e)}
          />
        </div>

        <div>
          <label>password : </label>
          <input
            placeholder="password"
            type="password"
            name="password"
            value={forms["signupForm"].password}
            onChange={(e) => handleChange("signupForm", e)}
          />
        </div>

        <div>
          <label>confirm password: </label>
          <input
            placeholder="confirmPassword"
            type="password"
            name="confirmPassword"
            value={forms["signupForm"].confirmPassword}
            onChange={(e) => handleChange("signupForm", e)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

    </>
  );
};

export default Counter;
