import { Component, OnInit } from "@angular/core";
import { OrderService } from "src/app/core/mock/order.service";
import { ActivatedRoute } from "@angular/router";
import { Config } from "src/app/core/data/config";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"]
})
export class OrderDetailComponent implements OnInit {
  constructor(
    private _orderService: OrderService,
    private _route: ActivatedRoute,
    private _config: Config
  ) {}

  public order: any = {};
  public order_details: any[] = new Array();

  ngOnInit() {
    this._route.params.subscribe(data => {
      this._orderService.getOrderDetail({ order_id: data.id }).subscribe(
        res => {
          console.log(res);
          //@ts-ignore
          if (res.status == 200) {
            let result: any = res;
            this.order = result.order[0];

            this.order_details = result.order_detail;
            for (let i = 0; i < this.order_details.length; i++) {
              this.order_details[i].variant = JSON.parse(
                this.order_details[i].variant
              );
            }
            this.order.name = this.order_details[0].variant.name;
          } else {
            //@ts-ignore
            this._config.showMessage(res.message);
          }
        },
        err => {
          this._config.showMessage("Order detail not found");
        }
      );
    });
  }
}