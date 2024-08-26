// React Imports
import React, { useState, useEffect } from "react";

// react-beautiful-dnd Imports
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//dnd-kit Imports
import { DndContext } from "@dnd-kit/core";

// Material UI Imports
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

// Other Imports
import { useIntl } from "react-intl";

// Local Imports
import AppsContainer from "@enjoey/core/AppsContainer";
import { useAuthUser } from "@enjoey/utility/AuthHooks";
import Drop from "./Droppable";
import Drag from "./Draggable";

const drawerWidth = 300;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: "100%",
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  })
);
const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    color: "white",
    borderRadius: "10px",
    backgroundColor: "#2196f3",
    position: "relative",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
  })
);
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const Page1 = () => {
  const theme = useTheme();
  const { messages } = useIntl();
  const { user } = useAuthUser();
  console.log("Role:", user.role);
  const [dropArea, setDropArea] = useState([1]);

  // open drawer
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // create new section
  const [sectionCount, setSectionCount] = useState(1);
  const [sortedDivs, setSortedDivs] = useState([]);
  const handleCreateSection = () => {
    setSectionCount((prevSectionCount) => prevSectionCount + 1);
    setDropArea(prevDropArea => [...prevDropArea, 1]);
  };

  useEffect(() => {
    const newSortedDivs = Array.from({ length: sectionCount }, (_, i) => `droppable-${i}`);
    setSortedDivs(newSortedDivs);
  }, [sectionCount]);

  // sorting sections
  const handleSortEnd = (event) => {
    console.log(event);
    const { draggableId, source, destination } = event;
    if (!destination) return;

    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;
    const sourceData = isDropped[sourceDroppableId];
    const destinationData = isDropped[destinationDroppableId];
    const sourceTitle = titles[sourceDroppableId];
    const destinationTitle = titles[destinationDroppableId];
    const sourceDrop = dropArea[parseInt(sourceDroppableId.split("-")[1], 10)];
    const destinationDrop = dropArea[parseInt(destinationDroppableId.split("-")[1], 10)];

    // Update the data in both the source and destination droppables
    setIsDropped((prev) => ({
      ...prev,
      [sourceDroppableId]: destinationData,
      [destinationDroppableId]: sourceData,
    }));

    setTitles((prev) => ({
      ...prev,
      [sourceDroppableId]: destinationTitle,
      [destinationDroppableId]: sourceTitle,
    }));

    setDropArea((prev) => {
      const updatedDropArea = [...prev];
      updatedDropArea[parseInt(sourceDroppableId.split("-")[1], 10)] = destinationDrop;
      updatedDropArea[parseInt(destinationDroppableId.split("-")[1], 10)] = sourceDrop;
      return updatedDropArea;
    })

    console.log("sourceDroppable", sourceDroppableId);
    console.log("destinationDroppable", destinationDroppableId);
    const sourceIndex = sortedDivs.findIndex((id) => id === draggableId);
    const destinationIndex = sortedDivs.findIndex((id) => id === destination.droppableId);
    if (sourceDroppableId === destinationDroppableId) {
      const cardIndex = sortedDivs.findIndex((id) => id === sourceDroppableId);
      if (cardIndex !== -1) {
        const newGridOrder = Array.from(dropArea[cardIndex]);
        const sourceIndex = source.index - 1;
        const destinationIndex = destination.index - 1;
        const [removedGrid] = newGridOrder.splice(sourceIndex, 1);
        newGridOrder.splice(destinationIndex, 0, removedGrid);
  
        setDropArea((prev) => {
          const updatedDropArea = [...prev];
          updatedDropArea[cardIndex] = newGridOrder;
          return updatedDropArea;
        });
      }
    }
    
    if (sourceIndex !== -1 && destinationIndex !== -1) {
      const newSortedDivs = Array.from(sortedDivs);
      newSortedDivs.splice(sourceIndex, 1);
      newSortedDivs.splice(destinationIndex, 0, draggableId);
      setSortedDivs(newSortedDivs);
    }

    // if (sourceDroppableId && destinationDroppableId && draggableId && sortedDivs) {
    //   const sourceIndex = sortedDivs.findIndex((id) => id === draggableId);
    //   const destinationIndex = sortedDivs.findIndex((id) => id === destination.draggableId);

    //   if (sourceIndex !== -1 && destinationIndex !== -1) {
    //     const newTitles = Array.from(titles);
    //     const [removedTitle] = newTitles.splice(sourceIndex, 1);
    //     newTitles.splice(destinationIndex, 0, removedTitle);
    //     setTitles(newTitles);
    //   }
    // }
  };

  useEffect(() => {
    console.log("sortedDivs", sortedDivs);
  }, [sortedDivs]);
  

  // section titles
  const [titles, setTitles] = useState(Array.from(Array(sortedDivs.length), () => "Title"));
  const handleEditTitle = (index) => {
    const newTitles = Array.from(titles);
    const newTitle = prompt("Enter the new title");
    if (newTitle) {
      newTitles[index] = newTitle;
      setTitles((prev) => ({
        ...prev,
        [`droppable-${index}`]: newTitles[index],
      }));
    }
  };

  // section context menu
  const [contextMenu, setContextMenu] = React.useState(null);
  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };
  const handleClose = () => {
    setContextMenu(null);
  };
  const handleDelete = () => {
    console.log(isDropped);
  };

  // drop settings
  const [isDropped, setIsDropped] = useState({});
  const [isPut, setIsPut] = useState({});
  const [grids, setGrids] = useState([]);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && over.id.startsWith("droppable")) {
      const id = over.id;
      const sectionIndex = parseInt(id.split("-")[1], 10);
      setIsPut(active.data.current);
      setIsDropped((prev) => {
        const newIsDropped = { ...prev };
        if (newIsDropped[over.id]) {
          newIsDropped[over.id] = active.data.current.data;
        } else {
          newIsDropped[over.id] = active.data.current.data;
        }
        return newIsDropped;
      });
      const newGrid = {
        id: grids.length + 1, // Generate a unique ID for the grid
        item: active.data.current.data,
      };
      setGrids([...grids, newGrid]);
      setDropArea(prevDropAreaArray=> prevDropAreaArray.map((count, index) => {
        return (
          index === sectionIndex ? count + 1 : count
        )
      }));
    }
  };

  // section hovering
  const [hovered, setHovered] = useState([]);
  const handleMouseEnter = (droppableId) => {
    const updatedHovered = { ...hovered };
    updatedHovered[droppableId] = true;
    setHovered(updatedHovered);
  };
  const handleMouseLeave = (droppableId) => {
    const updatedHovered = { ...hovered };
    updatedHovered[droppableId] = false;
    setHovered(updatedHovered);
  };


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <AppBar open={open}>
        {/* Hidden Drawer Start */}
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                overflow: "hidden",
              },
            }}
            variant="persistent"
            anchor="right"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon />
              </IconButton>
            </DrawerHeader>
            <div
              style={{
                cursor: "pointer",
                margin: "2px 10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card
                style={{
                  backgroundColor: "#2196f3",
                  color: "white",
                  padding: "5px",
                }}
              >
                <h3>
                  Layout Editor
                </h3>
              </Card>
              <h4>
                You can start adding fields
              </h4>
              <Drag id="1" key="test" data="test" type="test">
                <Card
                  style={{
                    borderRadius: "4px",
                    width: "100%",
                    padding: "10px",
                  }}
                >
                  Test
                </Card>
              </Drag>
              <Drag id="2" key="test2" data="test2" type="test2">
                <Card
                  style={{
                    borderRadius: "4px",
                    width: "100%",
                    padding: "10px",
                  }}
                >
                  Test2
                </Card>
              </Drag>
            </div>
          </Drawer>
        {/* Hidden Drawer End */}
        <div
          id="base-container"
          style={{
            marginLeft: "10px",
            marginRight: "10px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2>Survey Editor</h2>
          <Card style={{ marginBottom: "10px" }}>
            <div id="sub-container" style={{ display: "flex", justifyContent: "space-between" }}>
              <div id="subtitles" style={{ marginLeft: "5px" }}>
                <Main open={open}>
                  <h4 style={{ marginBottom: "1px", lineHeight: "1.2" }}>You can start adding fields with Input Creator.</h4>
                  <h5 style={{ lineHeight: "1.2" }}>Right click to delete.</h5>
                </Main>
              </div>
              <div id="drawer-icon" style={{ marginTop: "5px" }}>
                <IconButton
                  color="inherit"
                  onClick={handleDrawerOpen}
                  sx={{ ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
            <Button
              type="button"
              onClick={handleCreateSection}
              fullWidth
            >
              Create New Section
            </Button>
          </Card>
          <DragDropContext onDragEnd={handleSortEnd}>
            {sortedDivs.map((divId, index) => {
              const sectionIndex = dropArea[index];
              const cardDroppableId = `card-${divId}`;
              return (
                <Droppable droppableId={cardDroppableId} key={cardDroppableId}>
                  {(provided) => (
                    <div
                      ref=
                        {provided.innerRef}
                        // eslint-disable-next-line
                        {...provided.droppableProps}
                      style={{ marginBottom: "10px" }}
                    >
                      <Draggable draggableId={divId} index={index} shouldAnimateDragMovement={false}>
                        {(provide) => (
                          <div
                            ref={provide.innerRef}
                            // eslint-disable-next-line
                            {...provide.draggableProps}
                            // eslint-disable-next-line
                            {...provide.dragHandleProps}
                          >
                            <Card>
                              <div style={{ cursor: "grab" }}>
                                <div
                                  style={{
                                    margin: "5px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ fontWeight: "bold" }}>{titles[`droppable-${index}`]}</div>
                                  <Button
                                    type="button"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                    onClick={() => handleEditTitle(index)}
                                  >
                                    Edit Title
                                  </Button>
                                </div>
                                <Grid container spacing={2} justifyContent="center" alignItems="center">
                                  {Array.from({ length: sectionIndex }).map((_, index) => {
                                    const droppableId = `${divId}-${index + 1}`;
                                    const isDroppedValue = isDropped[droppableId];
                                    const labelName = isDroppedValue || "Drop here";

                                    return (
                                      <div
                                        key={droppableId}
                                        style={{ width: "25%" }}
                                        onContextMenu={handleContextMenu}
                                        onMouseEnter={() => handleMouseEnter(droppableId)}
                                        onMouseLeave={() => handleMouseLeave(droppableId)}
                                      >
                                        <Droppable droppableId={droppableId} key={droppableId} direction="horizontal">
                                          {(provided) => (
                                            <div
                                              ref={provided.innerRef}
                                              // eslint-disable-next-line
                                              {...provided.droppableProps}
                                            >
                                              <Draggable draggableId={droppableId} index={index}>
                                                {(provide) => (
                                                  <div
                                                    ref={provide.innerRef}
                                                    // eslint-disable-next-line
                                                    {...provide.draggableProps}
                                                    // eslint-disable-next-line
                                                    {...provide.dragHandleProps}
                                                  >
                                                    <Drop id={droppableId} hovered={hovered[droppableId]}>
                                                      <Grid
                                                        item
                                                        xs={12}
                                                        style={{
                                                          display: "flex",
                                                          justifyContent: "center",
                                                          alignItems: "center",
                                                        }}
                                                      >
                                                        {labelName}
                                                      </Grid>
                                                      <Menu
                                                        open={contextMenu !== null}
                                                        onClose={handleClose}
                                                        anchorReference="anchorPosition"
                                                        anchorPosition={
                                                          contextMenu !== null
                                                            ? {
                                                                top: contextMenu.mouseY,
                                                                left: contextMenu.mouseX,
                                                              }
                                                            : undefined
                                                        }
                                                      >
                                                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                                      </Menu>
                                                    </Drop>
                                                  </div>
                                                )}
                                              </Draggable>
                                              {provided.placeholder}
                                            </div>
                                          )}
                                        </Droppable>
                                      </div>
                                    );
                                  })}
                                </Grid>
                              </div>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </DragDropContext>

          {/* <DragDropContext onDragEnd={handleSortEnd}>
            {sortedDivs.map((divId, index) => {
              const sectionIndex = dropArea[index];
              return (
                <Droppable droppableId={divId} key={divId}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      // eslint-disable-next-line
                      {...provided.droppableProps}
                      style={{ marginBottom: "10px" }}
                    >
                      <Draggable
                        draggableId={divId}
                        index={index}
                        shouldAnimateDragMovement={false}
                      >
                        {(provide) => (
                          <div
                            ref={provide.innerRef}
                            // eslint-disable-next-line
                            {...provide.draggableProps}
                            // eslint-disable-next-line
                            {...provide.dragHandleProps}
                          >
                            <Card>
                              <div
                                style={{ cursor: "grab" }}
                              >
                                <div
                                  style={{
                                    margin: "5px",
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ fontWeight: "bold" }}>{titles[`droppable-${index}`]}</div>
                                  <Button
                                    type="button"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}
                                    onClick={() => handleEditTitle(index)}
                                  >
                                    Edit Title
                                  </Button>
                                </div>
                                <Grid
                                  container
                                  spacing={2}
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  {Array.from({ length: sectionIndex }).map((_, index) => {
                                    const droppableId = `${divId}-${index + 1}`;
                                    const isDroppedValue = isDropped[droppableId];
                                    const labelName = isDroppedValue || "Drop here";

                                    return (
                                      <div
                                        key={droppableId}
                                        style={{ width: "25%" }}
                                        onContextMenu={handleContextMenu}
                                        onMouseEnter={() => handleMouseEnter(droppableId)}
                                        onMouseLeave={() => handleMouseLeave(droppableId)}
                                      >
                                        <Drop
                                          id={droppableId}
                                          hovered={hovered[droppableId]}
                                        >
                                          <Grid
                                            item
                                            xs={12}
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            {labelName}
                                          </Grid>
                                          <Menu
                                            open={contextMenu !== null}
                                            onClose={handleClose}
                                            anchorReference="anchorPosition"
                                            anchorPosition={
                                              contextMenu !== null
                                                ? {
                                                    top: contextMenu.mouseY,
                                                    left: contextMenu.mouseX,
                                                  }
                                                : undefined
                                            }
                                          >
                                            <MenuItem onClick={handleDelete}>
                                              Delete
                                            </MenuItem>
                                          </Menu>
                                        </Drop>
                                      </div>
                                    );
                                  })}
                                </Grid>
                              </div>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )
            })}
          </DragDropContext> */}
        </div>
      </AppBar>
    </DndContext>
  );
};

export default Page1;