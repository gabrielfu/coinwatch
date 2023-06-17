'use client';

import CreatePortfolioModal from "../components/modals/CreatePortfolioModal";
import DeletePortfolioModal from "../components/modals/DeletePortfolioModal";
import DeleteTransactionModal from "../components/modals/DeleteTransactionModal";

const ModalsProvider = () => {
  return ( 
    <>
      <CreatePortfolioModal />
      <DeletePortfolioModal />
      <DeleteTransactionModal />
    </>
   );
}
 
export default ModalsProvider;