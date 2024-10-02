import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import EmptyList, { EEmptyList } from ".";

export default {
  title: "Components/Molecules/EmptyList",
  component: EmptyList,
} as Meta<typeof EmptyList>;

const Template: StoryFn<typeof EmptyList> = (args) => {
  return <EmptyList {...args} />;
};

export const Dashboard = Template.bind({});
Dashboard.args = {
  type: EEmptyList.DASHBOARD,
};

export const BookmarkRepo = Template.bind({});
BookmarkRepo.args = {
  type: EEmptyList.BOOKMARK_REPO,
};

export const ArchivedRepo = Template.bind({});
ArchivedRepo.args = {
  type: EEmptyList.ARCHIVE_REPO,
};

export const AccessRepo = Template.bind({});
AccessRepo.args = {
  type: EEmptyList.ACCESS_REPO,
};

export const Category = Template.bind({});
Category.args = {
  type: EEmptyList.CATEGORY,
};

export const Release = Template.bind({});
Release.args = {
  type: EEmptyList.RELEASE,
};

export const Filter = Template.bind({});
Filter.args = {
  type: EEmptyList.FILTER,
};

export const RepoKeys = Template.bind({});
RepoKeys.args = {
  type: EEmptyList.REPO_KEYS,
};
