import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../context/CartContext";
import { useUser } from "../../context/UserContext";
import { mockGroups } from "../../data/mockData";
import showToast from "../../components/shared/CustomToast";
import FormRow from "../../components/shared/FormRow";
import { formatTime, getDateString } from "../../utils/functions";
import Wrapper from "../../assets/wrappers/account/Register";

// TODO get groups for particular kids???
const groups = mockGroups;

const Register = () => {
  const { cart, dispatch } = useContext(CartContext);
  const { user } = useUser();
  const [selectedGroups, setSelectedGroups] = useState({});
  const [checkedGroups, setCheckedGroups] = useState({});

  const kidsCount = user.kids.length;

  const registerSeason = "Fall 2024";

  useEffect(() => {
    const initialSelectedGroups = {};
    const initialCheckedGroups = {};
    cart.forEach((item) => {
      if (item.type === "group") {
        initialSelectedGroups[item.groupId] = item.quantity;
        initialCheckedGroups[item.groupId] = true;
      }
    });
    setSelectedGroups(initialSelectedGroups);
    setCheckedGroups(initialCheckedGroups);
  }, [cart]);

  const getSchedule = (schedule) => {
    return schedule.map((option) => (
      <p key={`${option.weekday}_${option.startTime}`}>
        {`${option.weekday.substring(0, 3)} ${formatTime(
          option.startTime
        )} - ${formatTime(option.endTime)}`}
      </p>
    ));
  };

  const getMaxQuantity = (group) => {
    const spotsAvailable = group.spotsNumber - group.spotsTaken;
    // return Math.min(kidsCount, spotsAvailable);
    return spotsAvailable;
  };

  const handleQuantityChange = (groupId, newQuantity) => {
    const group = mockGroups.find((g) => g.groupId === groupId);
    const maxQuantity = getMaxQuantity(group);
    const validQuantity = Math.max(1, Math.min(newQuantity, maxQuantity));

    setSelectedGroups((prev) => ({
      ...prev,
      [groupId]: validQuantity,
    }));
  };

  const handleCheckboxChange = (groupId) => {
    setCheckedGroups((prev) => {
      const newCheckedGroups = {
        ...prev,
        [groupId]: !prev[groupId],
      };

      // Initializing quantity in selectedGroups when the group is checked
      if (!prev[groupId]) {
        setSelectedGroups((prevSelected) => ({
          ...prevSelected,
          [groupId]: prevSelected[groupId] || 1,
        }));
      }

      return newCheckedGroups;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedGroupsArray = Object.entries(selectedGroups);

    const checkedSelectedGroups = selectedGroupsArray.filter(
      ([groupId]) => checkedGroups[groupId]
    );

    if (checkedSelectedGroups.length === 0) {
      toast.error("Please select at least one group");
      return;
    }

    checkedSelectedGroups.forEach(([groupId, quantity]) => {
      if (quantity > 0) {
        const group = mockGroups.find((g) => g.groupId === parseInt(groupId));
        // dispatch({
        //   type: "ADD_TO_CART",
        //   payload: {
        //     id: `group-${groupId}`,
        //     type: "group",
        //     groupId: parseInt(groupId),
        //     name: group.name,
        //     quantity: quantity,
        //     price: group.tuition,
        //     image: group.img,
        //   },
        // });
        // TODO update spotsTaken
      }
    });

    // setSelectedGroups({});
    // setCheckedGroups({});

    // document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    //   checkbox.checked = false;
    // });

    // document
    //   .querySelectorAll('.quantity-selector input[type="number"]')
    //   .forEach((input) => {
    //     input.value = "1";
    //   });

    showToast({
      type: "success",
      title: "You registered successfully!",
      message: "A Confirmation has been sent to your email.",
      linkText: "Go to your profile",
      link: "/account",
    });
  };

  return (
    <Wrapper>
      <p className="season b2">{registerSeason}</p>
      {mockGroups.length > 0 && (
        <>
          <table className="groups">
            <thead>
              <tr className="b1">
                <th></th>
                <th>Class</th>
                <th>Days</th>
                <th>Tuition</th>
                <th>Spots available</th>
                <th>How many kids</th>
              </tr>
            </thead>
            <tbody className="b2">
              {mockGroups.map((g) => (
                <tr key={g.groupId}>
                  <td className="checkbox">
                    <FormRow
                      type="checkbox"
                      name={`selectGroup-${g.groupId}`}
                      checked={checkedGroups[g.groupId] || false}
                      onChange={() => handleCheckboxChange(g.groupId)}
                      disabled={g.spotsNumber - g.spotsTaken < 1}
                    />
                  </td>
                  <td className="class">
                    <h5 className="name">
                      {g.name} ({g.minAge}-{g.maxAge} years old)
                    </h5>
                    <p className="b2 desc">{g.decriptionLong}</p>
                  </td>
                  <td className="days">
                    <div className="b2 days">{getSchedule(g.schedule)}</div>
                    <p className="b2 dates">
                      {getDateString(g.startDate)} - {getDateString(g.endDate)}
                    </p>
                  </td>
                  <td>${g.tuition}</td>
                  <td className="spots">{g.spotsNumber - g.spotsTaken}</td>
                  <td className="kids-number">
                    <div className="quantity-selector">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            g.groupId,
                            (selectedGroups[g.groupId] || 1) - 1
                          )
                        }
                        disabled={(selectedGroups[g.groupId] || 1) <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={selectedGroups[g.groupId] || 1}
                        onChange={(e) =>
                          handleQuantityChange(
                            g.groupId,
                            parseInt(e.target.value) || 1
                          )
                        }
                        min={1}
                        max={getMaxQuantity(g)}
                        className="b3"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            g.groupId,
                            (selectedGroups[g.groupId] || 1) + 1
                          )
                        }
                        disabled={
                          (selectedGroups[g.groupId] || 1) >= getMaxQuantity(g)
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={handleSubmit}
            className="b2 selected long add-to-cart"
            disabled={Object.entries(checkedGroups).every(
              ([_, checked]) => !checked
            )}
          >
            Submit
          </button>
        </>
      )}
      {mockGroups.length <= 0 && <div>No groups to show</div>}
    </Wrapper>
  );
};

export default Register;
