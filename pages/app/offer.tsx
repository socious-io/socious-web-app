import * as React from 'react';
//import type { NextPage } from "next";
import {useState} from 'react';
// import { ethers } from "ethers";
// import abi from "../abis/Escrow.json";
// import { getData } from "../utils/storage";
// import ClipLoader from "react-spinners/ClipLoader";
// import {
//   Button,
//   Checkbox,
//   Avatar,
//   Chip,
//   Switch,
//   TextInput,
// } from "@components/common";
import {useToggle} from 'hooks';
import {GeneralLayout} from 'layout';

// import { ReactComponent as WalletIcon } from "../asset/icons/wallet.svg";
// import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import PostCard from 'layout/screen/PostCard/PostCard';
import ProfileCard from 'layout/screen/ProfileCard/ProfileCard';
import NotificationCard from 'layout/screen/NotificationCard/NotificationCard';

import CommentItem from 'layout/screen/CommentItem/CommentItem';
import ProjectCard from '@components/common/Project/component/ProjectCard';
import {defaultProject} from '@models/project';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#FCFCFC',
};

const Offer = () => {
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const {state} = useToggle();

  // const sendSuccessOffer = async (data: string) => {
  //   //window?.ReactNativeWebView?.postMessage(data);
  // };

  // const sendOffer = async () => {
  //   try {
  //     setLoading(true);
  //     if (typeof window.ethereum !== "undefined") {
  //       const contractAddress = "0xA3561De6Ebf7954eF118bc438DD348aB75989639";
  //       const contractABI = abi.abi;
  //       // const provider = new ethers.providers.JsonRpcProvider(
  //       //   "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
  //       // );

  //       const provider = new ethers.providers.Web3Provider(window?.ethereum);
  //       const signer = provider.getSigner();
  //       //const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  //       // const createNewEscrow = async () => {
  //       //   ethObject()
  //       //   try {
  //       //     if (ethereum) {
  //       //       const { _contributorAddress, _projectId, _orgType, value } = formData;
  //       //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       //       const signer = provider.getSigner();
  //       //       const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  //       //       //const parsedAmount = ethers.utils.parseEther(amount);
  //       //       console.log("no error yet", _contributorAddress, _projectId, _orgType)
  //       //       console.log(transactionsContract)
  //       //       const fee = await transactionsContract.getImpactContFee()
  //       //       const parsedAmount = fee.toNumber();
  //       //       console.log(parsedAmount)
  //       //       const _newEscrow = await transactionsContract.newEscrow(_contributorAddress, _projectId, _orgType, {value: value});
  //       //       console.log(_newEscrow)
  //       //       console.log("error")
  //       //const signer = provider.getSigner();
  //       const contract = new ethers.Contract(
  //         contractAddress,
  //         contractABI,
  //         signer
  //       );
  //       console.log(contract);
  //       const pageAddress = getData("address");
  //       const projectId = getData("project_id");

  //       //alert(pageAddress);
  //       //let _escrow = await contract.getImpactOrgFee();
  //       let _escrow = await contract.newEscrow(
  //         "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //         "3",
  //         "1",
  //         { value: "10000000000" }
  //       );

  //       //console.log(_escrow);
  //       //let escrow = await _escrow.toString();
  //       console.log("Response---> ", _escrow);

  //       if (_escrow) {
  //         await sendSuccessOffer("offered");
  //       } else {
  //         await sendSuccessOffer("failed");
  //       }
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     await sendSuccessOffer("failed");
  //   }
  // };

  return (
    <GeneralLayout>
      <div className="w-1/3">
        <ProfileCard
          name="Childhood Cancer"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh aliquet nullam odio maecenas semper. Dui felis suspendisse nunc, in vel enim nunc adipiscing donec. Pellentesque a magna venenatis ut ut semper dictum sit sem. Suspendisse lacus, pulvinar elit ipsum fermentum. Ipsum, orci, faucibus nibh et commodo et, dignissim erat. Adipiscing fusce et fames aliquam condimentum. "
        />
      </div>
      <div className="w-2/3 space-y-4">
        <PostCard
          id="id"
          name="Jayson Ilagan"
          time="1 hour ago"
          passion="Child Health"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh aliquet nullam odio maecenas semper. Dui felis suspendisse nunc, in vel enim nunc adipiscing donec. Pellentesque a magna venenatis ut ut semper dictum sit sem. Suspendisse lacus, pulvinar elit ipsum fermentum. Ipsum, orci, faucibus nibh et commodo et, dignissim erat. Adipiscing fusce et fames aliquam condimentum. "
        />

        {/* <CommentItem name="User" time="1 min ago" /> */}

        <div className="rounded-2xl border border-grayLineBased py-2 px-4">
          <NotificationCard
            name="User One"
            time="1 min ago"
            action="liked your post"
          />
        </div>
        <ProjectCard project={defaultProject} />
      </div>
    </GeneralLayout>
  );
};

export default Offer;
