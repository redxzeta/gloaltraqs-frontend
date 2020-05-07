import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPin } from "../../../actions/pins";

const useEditPinForm = (callback, pinData, setPinData) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const [editpinmodalState, seteditpinmodalState] = useState(false);
  const [editPinForm, seteditPinForm] = useState({
    //fields for editng
    id: "1",
    address: "",
    locality: "",
    region: "",
    country: "",
    postCode: "",
    title: "",
    description: "",
    category: "1",
    startDate: new Date(),
    endDate: new Date(),
  });

  const setEditPinState = (pin) => {
    seteditPinForm({
      ...pin,
      startDate: new Date(pin.startDate),
      endDate: new Date(pin.endDate),
    });
    seteditpinmodalState(!editpinmodalState);
  };

  const updateEditForm = (e) => {
    e.persist();
    seteditPinForm((editPinForm) => ({
      ...editPinForm,
      [e.target.name]: e.target.value,
    }));
  };

  const onEditSubmit = (e) => {
    //patches the selected pin
    if (e) e.preventDefault();

    dispatch(editPin(editPinForm, editPinForm.id, user.id));
    callback();
    setPinData({
      ...pinData,
      address: editPinForm.address,
      locality: editPinForm.locality,
      region: editPinForm.region,
      country: editPinForm.country,
      postCode: editPinForm.postCode,
      title: editPinForm.title,
      description: editPinForm.description,
      category: editPinForm.category,
      startDate: editPinForm.startDate,
      endDate: editPinForm.endDate,
    });

    editToggle();
  };

  const editToggle = () => {
    seteditpinmodalState(!editpinmodalState);
  };

  return {
    editToggle,
    editPinForm,
    seteditPinForm,
    editpinmodalState,
    onEditSubmit,
    updateEditForm,
    seteditpinmodalState,
    setEditPinState,
  };
};

export default useEditPinForm;
