import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ChatWindowComponentComponent } from "./chat-window-component.component";

describe("ChatWindowComponentComponent", () => {
  let component: ChatWindowComponentComponent;
  let fixture: ComponentFixture<ChatWindowComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
