import Banner from "@/components/common/banner";
import ListingForm from "@/app/(authenticated)/listings/[id]/form/components/listing-form";
import Container from "@/components/ui/container";
import { getListingById, isListingResponse } from "@/lib/api/listings";
import React from "react";

const ListingFormPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const isEdit = id !== "create";
  let listing;

  if (isEdit) {
    const response = await getListingById(params.id);
    if (!isListingResponse(response)) {
      return <Banner title="error" body="error"></Banner>;
    }

    listing = response.data;
  }

  return (
    <Container variant={"lg"}>
      <ListingForm listing={listing} variant={isEdit ? "edit" : "create"} />
    </Container>
  );
};

export default ListingFormPage;
