// Icons.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react"
import Ad from "./Ad"
import ArrowOut from "./ArrowOut"
import ArrowTop from "./ArrowTop"
import Calendar from "./Calendar"
import Camera from "./Camera"
import ChevronDown from "./chevrons/ChevronDown"
import ChevronLeft from "./chevrons/ChevronLeft"
import ChevronRight from "./chevrons/ChevronRight"
import ChevronUp from "./chevrons/ChevronUp"
import Clock from "./Clock"
import Copy from "./Copy"
import CreateDoc from "./CreateDoc"
import Cross from "./Cross"
import CutScissors from "./CutScissors"
import Database from "./Database"
import DotsHorizontal from "./DotsHorizontal"
import DotsVertical from "./DotsVertical"
import Download from "./Download"
import DownSize from "./DownSize"
import Edit from "./Edit"
import EditBorder from "./EditBorder"
import Enter from "./Enter"
import Esc from "./Esc"
import Fold from "./Fold"
import Hashtag from "./Hashtag"
import Home from "./Home"
import Info from "./Info"
import Line from "./Line"
import Linkedin from "./logo/Linkedin"
import Mail from "./Mail"
import Member from "./Member"
import More from "./More"
import Movie from "./Movie"
import Music from "./Music"
import Off from "./Off"
import Organization from "./Organization"
import Picture from "./Picture"
import Redirection from "./Redirection"
import Reset from "./Reset"
import Resize from "./Resize"
import Save from "./Save"
import School from "./School"
import Search from "./Search"
import ServerIndex from "./ServerIndex"
import Setting from "./Setting"
import Stat from "./Stat"
import Tag from "./Tag"
import Trash from "./Trash"
import TV from "./TV"
import User from "./User"
import Validate from "./Validate"

const meta: Meta = {
  title: "Components/Icons"
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div>
      <h1 className="mb-5">Icons List</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <span className="mb-5 text-xl">Large</span>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4">
              <Stat variant="large" />
              <User variant="large" />
              <Organization variant="large" />
              <School variant="large" />
              <Clock variant="large" />
              <Movie variant="large" />
              <TV variant="large" />
              <Mail variant="large" />
              <Copy variant="large" />
              <DotsVertical variant="large" />
              <Cross variant="large" />
              <Enter variant="large" />
              <Camera variant="large" />
              <ArrowOut variant="large" />
              <DotsHorizontal variant="large" />
              <ServerIndex variant="large" />
              <ChevronDown variant="large" />
            </div>
            <div className="p-4">
              <Music variant="large" />
              <Ad variant="large" />
              <Member variant="large" />
              <Setting variant="large" />
              <Home variant="large" />
              <Search variant="large" />
              <ChevronRight variant="large" />
              <Download variant="large" />
              <Redirection variant="large" />
              <Fold variant="large" />
              <ArrowTop variant="large" />
              <Esc variant="large" />
              <Hashtag variant="large" />
              <ChevronLeft variant="large" />
              <Info variant="large" />
              <CutScissors variant="large" />
              <Calendar variant="large" />
            </div>
            <div className="p-4">
              <Resize variant="large" />
              <Reset variant="large" />
              <More variant="large" />
              <EditBorder variant="large" />
              <Linkedin variant="large" />
              <CreateDoc variant="large" />
              <Validate variant="large" />
              <Edit variant="large" />
              <Line variant="large" />
              <Trash variant="large" />
              <Tag variant="large" />
              <Picture variant="large" />
              <Database variant="large" />
              <Off variant="large" />
              <ChevronUp variant="large" />
              <Save variant="large" />
              <DownSize variant="large" />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <span className="mb-5 text-xl">Medium</span>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4">
              <Stat variant="medium" />
              <User variant="medium" />
              <Organization variant="medium" />
              <School variant="medium" />
              <Clock variant="medium" />
              <Movie variant="medium" />
              <TV variant="medium" />
              <Mail variant="medium" />
              <Copy variant="medium" />
              <DotsVertical variant="medium" />
              <Cross variant="medium" />
              <Enter variant="medium" />
              <Camera variant="medium" />
              <ArrowOut variant="medium" />
              <DotsHorizontal variant="medium" />
              <ServerIndex variant="medium" />
              <ChevronDown variant="medium" />
            </div>
            <div className="p-4">
              <Music variant="medium" />
              <Ad variant="medium" />
              <Member variant="medium" />
              <Setting variant="medium" />
              <Home variant="medium" />
              <Search variant="medium" />
              <ChevronRight variant="medium" />
              <Download variant="medium" />
              <Redirection variant="medium" />
              <Fold variant="medium" />
              <ArrowTop variant="medium" />
              <Esc variant="medium" />
              <Hashtag variant="medium" />
              <ChevronLeft variant="medium" />
              <Info variant="medium" />
              <CutScissors variant="medium" />
              <Calendar variant="medium" />
            </div>
            <div className="p-4">
              <Resize variant="medium" />
              <Reset variant="medium" />
              <More variant="medium" />
              <EditBorder variant="medium" />
              <Linkedin variant="medium" />
              <CreateDoc variant="medium" />
              <Validate variant="medium" />
              <Edit variant="medium" />
              <Line variant="medium" />
              <Trash variant="medium" />
              <Tag variant="medium" />
              <Picture variant="medium" />
              <Database variant="medium" />
              <Off variant="medium" />
              <ChevronUp variant="medium" />
              <Save variant="medium" />
              <DownSize variant="medium" />
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <span className="mb-5 text-xl">Small</span>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4">
              <Stat variant="small" />
              <User variant="small" />
              <Organization variant="small" />
              <School variant="small" />
              <Clock variant="small" />
              <Movie variant="small" />
              <TV variant="small" />
              <Mail variant="small" />
              <Copy variant="small" />
              <DotsVertical variant="small" />
              <Cross variant="small" />
              <Enter variant="small" />
              <Camera variant="small" />
              <ArrowOut variant="small" />
              <DotsHorizontal variant="small" />
              <ServerIndex variant="small" />
              <ChevronDown variant="small" />
            </div>
            <div className="p-4">
              <Music variant="small" />
              <Ad variant="small" />
              <Member variant="small" />
              <Setting variant="small" />
              <Home variant="small" />
              <Search variant="small" />
              <ChevronRight variant="small" />
              <Download variant="small" />
              <Redirection variant="small" />
              <Fold variant="small" />
              <ArrowTop variant="small" />
              <Esc variant="small" />
              <Hashtag variant="small" />
              <ChevronLeft variant="small" />
              <Info variant="small" />
              <CutScissors variant="small" />
              <Calendar variant="small" />
            </div>
            <div className="p-4">
              <Resize variant="small" />
              <Reset variant="small" />
              <More variant="small" />
              <EditBorder variant="small" />
              <Linkedin variant="small" />
              <CreateDoc variant="small" />
              <Validate variant="small" />
              <Edit variant="small" />
              <Line variant="small" />
              <Trash variant="small" />
              <Tag variant="small" />
              <Picture variant="small" />
              <Database variant="small" />
              <Off variant="small" />
              <ChevronUp variant="small" />
              <Save variant="small" />
              <DownSize variant="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
